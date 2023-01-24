package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.*

@ServerTest
@RunLevel(Runlevel.NONE)
class MinimalAlwaysRunsTest extends TestBase {

  //## todo: Address Guidewire OOTB GUnit runner regression:
  /* Receives warning in Guidewire Studio runner apparently intended for the testProtectedTestMethodsDoNotRun method of the MethodProtectionTest class.
   * ...apparently because this class just happens to follow that class name in alphabetical order.
   *
   * junit.framework.AssertionFailedError: Test method isn't public: testProtectedTestMethodsDoNotRun(gwservices.accelerator.testing.gunit.test.stubs.MethodProtectionTest)
   * 	 at org.junit.internal.runners.JUnit38ClassRunner.run(JUnit38ClassRunner.java:84)
   * 	 at org.junit.runner.JUnitCore.run(JUnitCore.java:160)
   * 	 at com.intellij.rt.execution.junit.JUnitForkedStarter.main(JUnitForkedStarter.java:58)
   */

  function testNothing() {
    // This test always runs. See TestRunnerTest.
  }

}