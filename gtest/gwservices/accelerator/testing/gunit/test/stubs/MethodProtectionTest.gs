package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.*

uses java.util.Set
uses java.util.TreeSet

@ServerTest
@RunLevel(Runlevel.NONE)
class MethodProtectionTest extends TestBase {

  static var _testMethodsThatRan : Set<String> as TestMethodsThatRan = new TreeSet<String>()

  //## todo: Address Guidewire OOTB GUnit runner regression:
  /* Receives warning in Guidewire Studio runner:
   * junit.framework.AssertionFailedError: Test method isn't public: testPrivateTestMethodsDoNotRun(gwservices.accelerator.testing.gunit.test.stubs.MethodProtectionTest)
   * 	 at org.junit.internal.runners.JUnit38ClassRunner.run(JUnit38ClassRunner.java:84)
   * 	 at org.junit.runner.JUnitCore.run(JUnitCore.java:160)
   * 	 at com.intellij.rt.execution.junit.JUnitForkedStarter.main(JUnitForkedStarter.java:58)
   */
  private function testPrivateTestMethodsDoNotRun() {
    TestMethodsThatRan.add("testPrivateTestMethodsDoNotRun")
  }

  protected function testProtectedTestMethodsDoNotRun() {
    TestMethodsThatRan.add("testProtectedTestMethodsDoNotRun")
  }

  function testMethodThatShouldRun() {
    TestMethodsThatRan.add("testMethodThatShouldRun")
  }

  private function thisMethodIsNeverCalled() {
    TestMethodsThatRan.add("thisMethodIsNeverCalled")
    if (false) {
      // This code suppresses the Guidewire Studio "This function is unused." warnings on the following methods:
      thisMethodIsNeverCalled()
      testPrivateTestMethodsDoNotRun()
    }
  }

}