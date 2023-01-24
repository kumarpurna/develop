package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.TestConstants

@ServerTest
@RunLevel(Runlevel.NONE)
class TestConstantsTest extends TestBase {

  function test_PROJECT_ROOT_DIRECTORY_PATH_value() {
    assertEquals("./", TestConstants.PROJECT_ROOT_DIRECTORY_PATH)
  }

  function test_MODULES_DIRECTORY_PATH_value() {
    assertEquals("./modules/", TestConstants.MODULES_DIRECTORY_PATH)
  }

  function test_MODULES_CONFIGURATION_DIRECTORY_PATH_value() {
    assertEquals("./modules/configuration/", TestConstants.MODULES_CONFIGURATION_DIRECTORY_PATH)
  }

}
