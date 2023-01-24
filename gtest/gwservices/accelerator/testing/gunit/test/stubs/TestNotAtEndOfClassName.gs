package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
class TestNotAtEndOfClassName extends TestBase {

  function testNotRun() {
    TestBase.fail("NO tests in this class should run because the name of this class does not end with 'Test'.")
  }

}
