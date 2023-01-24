package com.pwc.common

uses gw.api.system.server.ServerUtil
uses gw.api.util.DisplayableException
uses gw.pl.exception.GWConfigurationException
uses gw.plugin.InitializablePlugin
uses gw.plugin.security.AuthenticationServicePlugin
uses gw.plugin.security.AuthenticationServicePluginCallbackHandler
uses gw.plugin.security.AuthenticationSource
uses gw.plugin.security.CredentialVerificationResult
uses gw.plugin.security.UserNamePasswordAuthenticationSource

uses java.io.FileReader
uses java.util.Properties
uses javax.naming.CommunicationException
uses javax.naming.Context
uses javax.naming.NamingException
uses javax.naming.directory.InitialDirContext
uses javax.security.auth.login.FailedLoginException
uses java.net.UnknownHostException
uses org.apache.log4j.Logger


class AuthenticationServicePluginImpl implements AuthenticationServicePlugin, InitializablePlugin {

    static final var _logger = Logger.getLogger(AuthenticationServicePluginImpl)
    var properties = new Properties()
    final var initialContextFactory = "com.sun.jndi.ldap.LdapCtxFactory"
    final var securityAuthentication = "simple"
    final var ldap = "LDAP://"
    var _handler: AuthenticationServicePluginCallbackHandler = null
    final static var ENV = ServerUtil.Env?:""

    public static var PolicyHolderIntegrationUser: String
    static final var PH_USERNAME_KEY = "policyholder.integration.username"


    /**
     * Interface method implementation<br><br>
     * <p>
     * This method will authenticate in two ways:
     * 1) For higher environment, allow only LDAP authenticated users through UI.
     * 2) For local, do native authentication
     *
     * @param source Authentication source containing credentials provided by "user" (be it interactive or computer) to authenticate
     * @throws GWConfigurationException If no callback handler has been provided to the plugin yet
     * @throws IllegalArgumentException If the passed authentication source is not a UserNamePasswordAuthenticationSource
     * @returns PublicID of the user if they authenticate properly, null otherwise
     */

    // load properties file
    private function loadProperties(prop : Properties, propertyFilename : String) {
      var fileReader = new FileReader("FILENAME")//Have to mention the file name being reffered.
      prop.load(fileReader)
      fileReader.close()
    }

    override function authenticate(source: AuthenticationSource): String {
      _logger.info("authenticate")
      //*** DIGITAL CODE ****
      if (_handler == null) {
        throw new IllegalArgumentException("Callback handler not set")
      }

      var userPublicId: String
      if (ENV == "local" || ENV == "") {
        _logger.info("Detected local enviroment, doing nativeAuthentication")
        userPublicId = doGWNativeAuthentication(source)
      } else {
        _logger.info("Detected higher enviroment, doing LDAPAuthentication")
        userPublicId = doLDAPAuthentication(source)
      }
      _logger.info("authenticate")
      return userPublicId
    }

    /**
     * This method performs LDAP authentication
     *
     * @param source parameter consists of the usrname and password information from  plugin
     * @return Returns a userPublicID if the user is found.
     */
    private function doLDAPAuthentication(source: AuthenticationSource): String {
      _logger.info("doLDAPAuthentication")
      loadProperties(properties,"user_authentication")
      var ldapServerName = properties.getProperty("ldapServerName")
      var ldapServerPort = properties.getProperty("ldapServerPort")
      var tmpSecurityPrinciple = properties.getProperty("securityPrincipal")

      if (!(source typeis UserNamePasswordAuthenticationSource)) {
        throw new IllegalArgumentException("Authentication source type " + source.getClass().getName() + " is not known to this plugin")
      }
      assert _handler != null : "Callback handler not set"

      var uNameSource = source as UserNamePasswordAuthenticationSource

      var env = new Hashtable<String, String>()

      env.put(Context.INITIAL_CONTEXT_FACTORY, initialContextFactory)
      env.put(Context.PROVIDER_URL, ldap + ldapServerName + ":" + ldapServerPort)
      env.put(Context.SECURITY_AUTHENTICATION, securityAuthentication)
      var userName = uNameSource.getUsername()
      var securityPrinciple = tmpSecurityPrinciple.replace("{userName}", userName)

      env.put(Context.SECURITY_PRINCIPAL, securityPrinciple)
      env.put(Context.SECURITY_CREDENTIALS, uNameSource.getPassword())

      try {
        _logger.info("Attempting to connect LDAP server with the credentials")
        new InitialDirContext(env)
        _logger.info("Authentication with LDAP Successful")

      } catch (ex1: CommunicationException) {
        _logger.info("LDAP Server Error:" + ex1.Message)
        userName = uNameSource.getUsername()
        new DisplayableException("LDAP Server Error. Please contact your system administrator.")

      } catch (ex1: UnknownHostException) {
        _logger.info("LDAP Server Error:" + ex1.Message)
        new DisplayableException("LDAP Server Error. Please contact your system administrator.")

      } catch (e: NamingException) {
        _logger.info("User Name not found in LDAP Server")
        new FailedLoginException("Bad user name " + userName)
      }

      var username = uNameSource.getUsername()
      var userPublicId = _handler.findUser(username)
      if (userPublicId == null) {
        _logger.info("userPublicId is null, user not present in GW DB")
        new FailedLoginException("Bad user name " + userName)
      }
      _logger.info("doLDAPAuthentication")
      return userPublicId

    }

    /**
     * This method performs NativeAuthentication
     *
     * @param source parameter consists of the usrname and password information from  plugin
     * @return Returns a userPublicID if the user is found.
     */
    private function doGWNativeAuthentication(authenticationSource: AuthenticationSource): String {
      _logger.info("doGWNativeAuthentication")
      var userPublicId: String = null
      var authSource = authenticationSource as UserNamePasswordAuthenticationSource
      var userName = authSource.Username
      userPublicId = doGWNativeAuthentication(userName, authSource, userPublicId)
      _logger.info("User found in GW")
      _logger.info("doGWNativeAuthentication")
      return userPublicId
    }

    /**
     * This method performs NativeAuthentication
     *
     * @param source parameter consists of the usrname and password information from  plugin
     * @return Returns a userPublicID if the user is found.
     */
    private function doGWNativeAuthentication(userName: String, authSource: UserNamePasswordAuthenticationSource, userPublicId: String): String {
      _logger.warn("Authenticating user [" + userName + "] locally") //Useful for security monitoring
      var tempUID = _handler.findUser(userName)
      var res = _handler.verifyInternalCredential(tempUID, authSource.getPassword())
      if (res != CredentialVerificationResult.SUCCESS) {
        _logger.warn("Authentication for user ${userName} failed") //Useful for security monitoring
        new FailedLoginException("Bad user name " + userName)
      }
      userPublicId = tempUID
      return userPublicId
    }

    // function for setting AuthenticationServicePluginCallbackHandler
    override property  set Callback(authenticationServicePluginCallbackHandler: AuthenticationServicePluginCallbackHandler) {
      _handler = authenticationServicePluginCallbackHandler
    }

    //*** DIGITAL CODE ****
    override property  set Parameters(params: Map<Object, Object>) {
      PolicyHolderIntegrationUser = params.get(PH_USERNAME_KEY) as String

      if (PolicyHolderIntegrationUser == null) {
        throw new GWConfigurationException("The parameters policyholder.integration.username must be configured")
      }
    }
  }
