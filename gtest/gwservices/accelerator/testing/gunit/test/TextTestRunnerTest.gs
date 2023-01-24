package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.lang.reflect.IType
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.GUnitUtil
uses gwservices.accelerator.testing.gunit.TestConstants
uses gwservices.accelerator.testing.gunit.TextTestRunner
uses gwservices.accelerator.testing.gunit.test.stubs.AbstractBaseClassTest
uses gwservices.accelerator.testing.gunit.test.stubs.DoesNotExtendTestBaseTest
uses gwservices.accelerator.testing.gunit.test.stubs.DoesNotHaveServerTestAnnotationTest
uses gwservices.accelerator.testing.gunit.test.stubs.HasNoTestMethods
uses gwservices.accelerator.testing.gunit.test.stubs.MinimalAlwaysRunsTest
uses gwservices.accelerator.testing.gunit.test.stubs.MockTextTestRunnerTracksClasses
uses gwservices.accelerator.testing.gunit.test.stubs.OnePassingTest
uses gwservices.accelerator.testing.gunit.test.stubs.SubclassTest
uses gwservices.accelerator.testing.gunit.test.stubs.TestNotAtEndOfClassName
uses gwservices.accelerator.testing.gunit.test.stubs.TwoPassingTest

@ServerTest
@RunLevel(Runlevel.NONE)
class TextTestRunnerTest extends TestBase {

  function test_PATH_TO_GTEST_DIR_value() {
    assertEquals("./modules/configuration/gtest/", TestConstants.CUSTOMER_GTEST_PATH)
  }

  function testRunAllTests() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runAllTests()
    assertTestRunContains(runner, MinimalAlwaysRunsTest)
    assertTestRunContains(runner, TextTestRunnerTest)
  }

  function testRunTestInPackage() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.stubs")
    assertTestRunContains(runner, MinimalAlwaysRunsTest)
    assertTestRunDoesNotContain(runner, TextTestRunnerTest, "it is one level higher in the package hierarchy")
  }

  function testClassNameDoesNotEndWith_Test() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.stubs")
    assertTestRunContains(runner, MinimalAlwaysRunsTest)
    assertTestRunDoesNotContain(runner, TestNotAtEndOfClassName, "class name does NOT end with 'Test'")
  }

  function testClassDoesNotExtend_TestBase_Class() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.stubs")
    assertTestRunContains(runner, MinimalAlwaysRunsTest)
    assertTestRunDoesNotContain(runner, DoesNotExtendTestBaseTest, "test class does NOT extend TestBase class")
  }

  function testClassDoesNotHave_ServerTest_Annotation() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.stubs")
    assertTestRunContains(runner, MinimalAlwaysRunsTest)
    assertTestRunContains(runner, DoesNotHaveServerTestAnnotationTest)
  }

  function testAbstractBaseAndSubclassTest() {
    var runner = new MockTextTestRunnerTracksClasses()
    runner.runTestsInPackage("gwservices.accelerator.testing.gunit.test.stubs")
    // See also AbstractBaseAndSubclassTest
    assertTestRunDoesNotContain(runner, AbstractBaseClassTest, "this is an abstract classs; no instances can be created")
    assertTestRunContains(runner, SubclassTest)
  }

  function testOnePassingTest() {
    var runner = new TextTestRunner()
    runner.runTestsInClass(OnePassingTest)
    assertEquals("PassingTests", 1, runner.TestReporter.PassingTests)
    assertEquals("FailingTests", 0, runner.TestReporter.FailingTests)
    assertEquals("TotalTests", 1, runner.TestReporter.TotalTests)
  }

  function testTwoPassingTests() {
    var runner = new TextTestRunner()
    runner.runTestsInClass(TwoPassingTest)
    assertEquals("PassingTests", 2, runner.TestReporter.PassingTests)
    assertEquals("FailingTests", 0, runner.TestReporter.FailingTests)
    assertEquals("TotalTests", 2, runner.TestReporter.TotalTests)
  }

  function testHasNoTestMethods() {
    var runner = new TextTestRunner()
    var output = GUnitUtil.captureStandardOutput(\-> {
      runner.runTestsInClass(HasNoTestMethods)
    })
    assertEquals("gwservices.accelerator.testing.gunit.test.stubs.HasNoTestMethods has no test methods.", output.trim())
    assertEquals("PassingTests", 0, runner.TestReporter.PassingTests)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
    assertEquals("TotalTests", 1, runner.TestReporter.TotalTests)
  }

  private static function assertTestRunContains(runner: MockTextTestRunnerTracksClasses, iType: IType) {
    if (not runner.TestClassesRun.contains(iType)) {
      fail("TestRunner did NOT find and run tests in class <" + iType.Name + ">, but it should have.\n"
          + "  Found and ran these tests: " + runner.NamesOfAllTestClassRun)
    }
  }

  private static function assertTestRunDoesNotContain(runner: MockTextTestRunnerTracksClasses, iType: IType, reasonTestClassShouldBeIgnored: String) {
    if (runner.TestClassesRun.contains(iType)) {
      fail("TestRunner found and and run tests in class <" + iType.Name + ">, but it should NOT have because "
          + reasonTestClassShouldBeIgnored + ".")
    }
  }

}
