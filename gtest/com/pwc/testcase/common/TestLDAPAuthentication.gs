package com.pwc.testcase.common

uses com.guidewire.pl.system.service.LoginServiceAuthenticationServicePluginCallbackHandler
uses gw.plugin.security.UserNamePasswordAuthenticationSource
uses gw.testharness.TestBase
uses com.pwc.common.AuthenticationServicePluginImpl

uses java.io.FileReader
/*
  * This class handles the gunit testcases for Guidewire Ldap Authentication
  */

class TestLDAPAuthentication extends TestBase {
   private var authPlugin: AuthenticationServicePluginImpl

    /**
     * This method is used to initialize the test data common for all the tests in this class
     */
    override function beforeClass() {
      super.beforeClass()
      Logger.info("Initializing AuthenticationServicePluginImpl")
      authPlugin = new AuthenticationServicePluginImpl()
      //authPlugin.setCallback(new LoginServiceAuthenticationServicePluginCallbackHandler())
      authPlugin.Callback = new LoginServiceAuthenticationServicePluginCallbackHandler()
    }

    /**
     * This method is used to free up of resources initialized in the beforeClass() method
     */
    override function afterClass() {
      Logger.info("Dereferencing the AuthenticationServicePluginImpl")
      authPlugin = null
      super.afterClass()
    }

  // load properties file
  private function loadProperties(properties : Properties, propertyFilename : String) {
    var fileReader = new FileReader("FILENAME")//Filename needs to be added as per the project configuration
    properties.load(fileReader)
    fileReader.close()
  }

    /**
     * Tests the authentication service with valid ldap user credentials .
     */
    function testValidLDAPUserAuthentication() {
      Logger.info("Entering the test method 'testValidLDAPUserAuthentication'")
      // Setup test data in GW database
      var prop = new Properties()
      loadProperties(prop,"user_authentication")
      var user = prop.getProperty("LDAP_PC_TEST_USERNAME")
      var authSource = new UserNamePasswordAuthenticationSource()
      authSource.Username = user
      authSource.Password = prop.getProperty("LDAP_PC_TEST_USER_PASSWORD")
      var userPublicID = authPlugin.authenticate(authSource)
      Logger.info("The User Public ID: ${userPublicID}")
      assertNotNull("Login failed for the LDAP user  ${user}", userPublicID)
      Logger.info("Exiting the test method 'testValidLDAPUserAuthentication'")
    }

    /**
     * Tests the authentication service with invalid ldap user credentials (TestUser/gw).
     */
    function testInvalidLDAPUserAuthentication() {
      Logger.info("Entering the test method 'testInvalidLDAPUserAuthentication'")
      var authSource = new UserNamePasswordAuthenticationSource()
      authSource.Username = "TestUser"
      authSource.Password = "gw"
      var exception: Exception = null
      try {
        authPlugin.authenticate(authSource)
      } catch (ex: Exception) {
        exception = ex
      } finally {
        assertTrue("Login failed for the 'TestUser', Invalid credentials", exception typeis NullPointerException)
      }
      Logger.info("Exiting the test method 'testInvalidLDAPUserAuthentication'")
    }
  }

