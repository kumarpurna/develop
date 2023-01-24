package com.pwc.testcase.common

uses com.guidewire.pl.system.service.LoginServiceAuthenticationServicePluginCallbackHandler
uses com.pwc.common.AuthenticationServicePluginImpl
uses gw.plugin.security.UserNamePasswordAuthenticationSource
uses gw.testharness.TestBase

class TestGWNativeUserAuthentication extends TestBase {

  /*
  * This class handles the gunit testcases for Guidewire DB Authentication
  */
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

    /**
     * Tests the authentication service with super user credentials (su/gw).
     */
    function testSuperUserAuthentication() {
      Logger.info("Entering the test method 'testSuperUserAuthentication'")
      var authSource = new UserNamePasswordAuthenticationSource()
      authSource.Username = "su"
      authSource.Password = "gw"

      var userPublicID = authPlugin.authenticate(authSource)
      Logger.info("The User Public ID: ${userPublicID}")
      assertNotNull("Login failed for super user 'su'", userPublicID)
      Logger.info("Exiting the test method 'testSuperUserAuthentication'")
    }


    /**
     * Tests the authentication service with super user credentials (su/gw).
     */
    function testInvalidUserAuthentication() {
      Logger.info("Entering the test method 'testSuperUserAuthentication'")

      var authSource = new UserNamePasswordAuthenticationSource()
      authSource.Username = "TestUser"
      authSource.Password = "TestPassword"
      var exception: Exception = null
      try {
        var userPublicID = authPlugin.authenticate(authSource)
      } catch (ex: Exception) {
        exception = ex
      } finally {
        assertTrue("Login failed for the 'TestUser', Invalid credentials", exception typeis NullPointerException)
      }
      Logger.info("Exiting the test method 'testSuperUserAuthentication'")
    }

  }

