package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel
uses gw.lang.reflect.IType

abstract class GUnitTestRunner {

  private construct() {
  }

  static function runAllTests() {
    var runner = new TextTestRunner()
    runner.initalize()
    runner.runAllTests()
    runner.finish()
  }

  /**
   * Useful when you run the tests against a running server but you still only want to run unit tests.
   * It is much faster this way.
   */
  static function runAllUnitTests() {
    var runner = new TextTestRunner(new MockRunLevelAccessor(Runlevel.NONE))
    runner.initalize()
    runner.runAllTests()
    runner.finish()
  }

  static function runAllTestsExceptSlowTests() {
    var runner = new TextTestRunner()
    runner.TestActions = new TestActionSkipSlowTests(runner.TestActions)
    runner.initalize()
    runner.runAllTests()
    runner.finish()
  }

  static function runTestsInPackage(packageName: String) {
    print("Running tests in package " + packageName)
    var runner = new TextTestRunner()
    runner.initalize()
    runner.runTestsInPackage(packageName)
    runner.finish()
  }

  static function runTestsInPackageExceptSlowTests(packageName: String) {
    print("Running tests in package " + packageName)
    var runner = new TextTestRunner()
    runner.TestActions = new TestActionSkipSlowTests(runner.TestActions)
    runner.initalize()
    runner.runTestsInPackage(packageName)
    runner.finish()
  }

  static function runTestsInPackagesArrayWithXmlReport(testPackages: String[], reportDir: String) {
    print("testPackages: "+testPackages)
    var reporter = new XmlTestReporter(reportDir)
    for (testPackage in testPackages) {
      GUnitTestRunner.runTestsInPackageWithXmlReport(testPackage, reporter)
    }
  }

  static function runTestsInPackageWithXmlReport(packageName: String, reporter: ITestReporter) {
    runTestsInPackageWithXmlReport(packageName, reporter, new RunlevelWrapper())
  }

  static function runTestsInPackageWithXmlReport(packageName: String, reporter: ITestReporter, runlevelWrapper: IRunlevelAccessor) {
    print("Running tests in package " + packageName)
    var runlevelAccessor = runlevelWrapper
    var runner = new TextTestRunner(runlevelAccessor, reporter)
    runner.initalize()
    runner.runTestsInPackage(packageName)
    runner.finish()
  }

  static function runTestsInClass(clazz: IType) {
    print("Running tests in class " + clazz.Name)
    var runner = new TextTestRunner()
    runner.initalize()
    runner.runTestsInClass(clazz)
    runner.finish()
  }

  static function runTestMethod(clazz: IType, methodName: String) {
    print("Running test method " + clazz.Name + "." + methodName)
    var runner = new TextTestRunner()
    var method = clazz.TypeInfo.getCallableMethod(methodName, {})
    if (method == null) {
      print("Method '" + methodName + "' NOT found in test class " + clazz.DisplayName)
      runner.TestReporter.printFailLine()
    } else {
      runner.initalize()
      runner.runTestMethod(method)
      runner.finish()
    }
  }

}
