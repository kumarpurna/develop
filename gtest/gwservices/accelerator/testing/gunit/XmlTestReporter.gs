package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel
uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType

uses java.io.File

class XmlTestReporter implements ITestReporter {

  private static final var REPORT_FILE_NAME = "TestReport"
  private static final var REPORT_FILE_TYPE = ".xml"
  private var _passingTests: int as readonly PassingTests = 0
  private var _failingTests: int as readonly FailingTests = 0
  private var _classReport = new Report()
  private var _reportIndex = 0
  private var _testClassesSkippedDueToRunlevel: int as readonly TestClassesSkippedDueToRunlevel = 0
  private var _reportDir: String
  private var _classTimer = new TestTimer()
  private var _methodTimer = new TestTimer()
  private var _resultString: StringBuffer as ResultString = new StringBuffer()
  var testCaseBegin = "<testcase classname=\"%s\" name=\"%s\" time=\"%s\">"
  var errorBegin = "<error message=\"%s\" />"
  var failureBegin = "<failure message=\"%s\" type=\"%s\" />"
  var testSuiteBegin = "<testsuite name=\"%s\" errors=\"%d\" failures=\"%d\" tests=\"%d\" time=\"%s\" timestamp=\"%s\">"
  var testSuiteEnd = "</testsuite>"

  override property get TotalTests(): int {
    return PassingTests + FailingTests
  }

  construct(reportDir: String) {
    _reportDir = reportDir
  }


  override function begin() {
    _methodTimer.begin()
  }

  override function end() {
    if (_testClassesSkippedDueToRunlevel > 0) {
      print("  " + _testClassesSkippedDueToRunlevel + " test classes skipped because we are at run level <" + Runlevel.getCurrent() + ">."
          + "  Connect Guidewire Studio to a running web server to run all tests.")
    }
  }

  override function beginClass() {
    _classTimer.begin()
    _classReport = new Report()
  }

  override function endClass(iType: IType) {
    var runTime = _classTimer.endInMillis()
    _classReport._resultString.insert(0, String.format(testSuiteBegin, new Object[]{
        iType, _classReport._errors, _classReport._failures, _classReport._testCount, runTime, new Date()
    }))
    _classReport._resultString.append(testSuiteEnd)
    _reportIndex = _reportIndex + 1
    var reportFile = _reportDir + File.separatorChar + REPORT_FILE_NAME + _reportIndex + REPORT_FILE_TYPE

    if(iType.Name.contains("RunlevelNoneTest")){
      print("RunlevelNoneTest - runMethodendreportFile "+reportFile)
    }
    TestUtil.createReport(reportFile, _classReport._resultString.toString())
  }

  override function beginMethod() {
    _methodTimer.begin()
  }

  override function endMethod() {
  }

  override function printFailLine() {
  }

  override function skipClassDueToRunlevel(iType: IType) {
    var report = new Report()
    report._testCount += 1
    _testClassesSkippedDueToRunlevel++
  }

  override function classHasNoTestMethods(iType: IType) {}

  override function classFailed(iType: IType, ex: Throwable) {}

  override function testMethodPassed(method: IMethodInfo) {
    var report = new Report()
    report._testCount += 1
    reportTestMethod(report, method)
  }

  override function testMethodFailed(method: IMethodInfo, ex: Throwable) {
    var report = new Report()
    report._testCount += 1
    var errorStr = ""
    if (ex typeis Error) {
      errorStr = String.format(errorBegin, new Object[]{escapeXMLCharacters(ex.StackTraceAsString)})
      report.Errors += 1
    } else {
      errorStr = String.format(failureBegin, new Object[]{escapeXMLCharacters(ex.StackTraceAsString), escapeXMLCharacters(ex.toString())})
      report.Failures += 1
    }
    reportTestMethod(report, method, errorStr)
  }

  private function reportTestMethod(report:Report, method: IMethodInfo, errorStr: String = "") {
    var runTime = _methodTimer.endInMillis()
    report._resultString.append(String.format(testCaseBegin, new Object[]{method.OwnersType.DisplayName, method.DisplayName, runTime}))
    report._resultString.append(errorStr)
    report._resultString.append("</testcase>")
    _classReport.add(report)
  }

  // Utility function to replace XML delimiter characters
  private function escapeXMLCharacters(xmlString: String): String {
    xmlString = xmlString.replaceAll("&", "&amp;")
    xmlString = xmlString.replaceAll("'", "&apos;")
    xmlString = xmlString.replaceAll("\"", "&quot;")
    xmlString = xmlString.replaceAll("<", "&lt;")
    xmlString = xmlString.replaceAll(">", "&gt;")
    return xmlString
  }

  /**
   * object used to pass reporting data through methods
   */
  public static class Report {
    var _resultString: StringBuffer as ResultString = new StringBuffer()
    var _errors: int as Errors = 0
    var _failures: int as Failures = 0
    var _testCount: int as TestCount = 0

    /**
     * sums content of an inner report section to the outer section (testcase tags get added to testsuite tags)
     */
    function add(aReport: Report) {
      Errors += aReport.Errors
      Failures += aReport.Failures
      TestCount += aReport.TestCount
      ResultString.append(aReport.ResultString)
    }
  }
}
