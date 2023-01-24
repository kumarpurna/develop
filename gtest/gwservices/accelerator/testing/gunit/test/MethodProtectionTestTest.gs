package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.TextTestRunner
uses gwservices.accelerator.testing.gunit.test.stubs.MethodProtectionTest

@ServerTest
@RunLevel(Runlevel.NONE)
class MethodProtectionTestTest extends TestBase {

  function testMethodsRunInATest() {
    var runner = new TextTestRunner()
    runner.runTestsInClass(MethodProtectionTest.Type)
    assertEquals("[testMethodThatShouldRun]", MethodProtectionTest.TestMethodsThatRan.toString())
  }

}
