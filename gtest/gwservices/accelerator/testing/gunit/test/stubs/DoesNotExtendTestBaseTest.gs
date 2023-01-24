package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
class DoesNotExtendTestBaseTest /* extends TestBase */ {

  function testNotRun() {
    TestBase.fail("NO tests in this class should run because this class does NOT extend from the TestBase class.")
  }

}
