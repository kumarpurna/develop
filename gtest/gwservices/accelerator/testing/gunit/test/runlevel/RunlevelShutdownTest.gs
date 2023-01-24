package gwservices.accelerator.testing.gunit.test.runlevel

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.SHUTDOWN)
class RunlevelShutdownTest extends TestBase {

  function testMethodToRun() {
    TestClassesRun._runlevelsCalled.add(Runlevel.SHUTDOWN)
  }

}
