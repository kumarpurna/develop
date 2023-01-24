package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.GUnitTestRunner
uses gwservices.accelerator.testing.gunit.test.MockSlf4jLogger
uses gwservices.accelerator.testing.gunit.test.runlevel.RunlevelDefaultTest
uses gwservices.accelerator.testing.gunit.test.runlevel.TestClassesRun

@ServerTest
@RunLevel(Runlevel.NONE)
class RunLevelServerStartTest extends TestBase {

  override function beforeMethod() {
    TestClassesRun.clearStaticState()
    RunlevelDefaultTest._testsInThisClassWereRun = false
  }

  override function afterMethod(final possibleException : Throwable) {
    TestClassesRun.clearStaticState()
    RunlevelDefaultTest._testsInThisClassWereRun = false
  }

  /**
   * By design, because the <code>main.MainTest</code> GUnit test class has a <code>@RunLevel</code> of
   * <code>Runlevel.MULTIUSER</code>, then we expect that <b>ALL</b> the GUnit tests will be run, regardless of their
   * run level annotations.
   */
  function testAlwaysRunlevelMULTIUSER() {
    GUnitTestRunner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.runlevel")

    assertEquals("[NONE, GUIDEWIRE_STARTUP, SHUTDOWN, NODAEMONS, DAEMONS, MULTIUSER]",
        TestClassesRun._runlevelsCalled.toString())
    assertTrue("Expecting tests in RunlevelDefaultTest class SHOULD run. MainTest should always run ALL tests.",
        RunlevelDefaultTest._testsInThisClassWereRun)
  }

}