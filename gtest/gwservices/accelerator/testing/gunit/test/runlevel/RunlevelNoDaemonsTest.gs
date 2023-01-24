package gwservices.accelerator.testing.gunit.test.runlevel

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NODAEMONS)
class RunlevelNoDaemonsTest extends TestBase {

  function testMethodToRun() {
    TestClassesRun._runlevelsCalled.add(Runlevel.NODAEMONS)
  }

}
