package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType
uses gwservices.accelerator.testing.gunit.test.GUnitTestingLoggerCategory

uses java.io.PrintWriter
uses java.io.StringWriter

class TextTestReporter implements ITestReporter {

  var _passingTests: int as readonly PassingTests = 0
  var _failingTests: int as readonly FailingTests = 0
  var _testClassesSkippedDueToRunlevel: int as readonly TestClassesSkippedDueToRunlevel = 0
  var _runlevelAccessor: IRunlevelAccessor
  var _timer = new TestTimer()
  var _logger = GUnitTestingLoggerCategory.GUNIT_MAIN_TEST

  override property get TotalTests(): int {
    return PassingTests + FailingTests
  }

  construct(runlevelAccessor: IRunlevelAccessor) {
    _runlevelAccessor = runlevelAccessor
  }


  override function begin() {
    _timer.begin()
  }

  override function end() {
    var runTime = _timer.end()
    print("Result: " + _passingTests + " passed, " + _failingTests + " failed, in " + runTime.asString())
    if (_testClassesSkippedDueToRunlevel > 0) {
      print("  " + _testClassesSkippedDueToRunlevel + " test classes skipped because we are at run level <" + _runlevelAccessor.CurrentServerRunlevel + ">."
          + "  Connect Guidewire Studio to a running web server to run all tests.")
    }
    if (_failingTests > 0) {
      printFailLine()
    }
  }

  override function beginClass() {}

  override function endClass(iType: IType) {}

  override function beginMethod() {}

  override function endMethod() {}

  override function printFailLine() {
    print("====================================================================================================")
    print("  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  FAIL!  ")
    print("====================================================================================================")
  }

  override function skipClassDueToRunlevel(iType: IType) {
    _testClassesSkippedDueToRunlevel++
  }

  override function classHasNoTestMethods(iType: IType) {
    _failingTests++
    print(iType.DisplayName + " has no test methods.")
  }

  override function classFailed(iType: IType, ex: Throwable) {
    print(iType.DisplayName + " instantiation failed.")
    printException(ex)
  }

  override function testMethodPassed(method: IMethodInfo) {
    _passingTests++
  }

  private function printException(ex: Throwable) {
    System.out.println("                 -----------  Stack Trace --------------")
    var sw = new StringWriter()
    var pw = new PrintWriter(sw)
    ex.printStackTrace(pw)
    print(sw)
    System.out.flush()
    System.out.println("                --------------------------------------------------")
  }

  override function testMethodFailed(method: IMethodInfo, ex: Throwable) {
    _failingTests++
    var iType = method.OwnersType
    var methodName = method.DisplayName
    print("\n" + iType.DisplayName + "." + methodName + " failed:")
    printException(ex)
  }

}