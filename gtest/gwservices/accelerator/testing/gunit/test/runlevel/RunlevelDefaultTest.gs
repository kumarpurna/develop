package gwservices.accelerator.testing.gunit.test.runlevel

uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
class RunlevelDefaultTest extends TestBase {

  public static var _testsInThisClassWereRun : boolean = false

  function testMethodToRun() {
    _testsInThisClassWereRun = true
  }

}
