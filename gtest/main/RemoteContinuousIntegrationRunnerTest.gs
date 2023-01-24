package main

uses gw.api.system.server.Runlevel
uses gw.pl.logging.LoggerCategory
uses gw.testharness.RunLevel
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.GUnitTestRunner
uses gwservices.accelerator.testing.gunit.RunlevelWrapper

uses java.io.File

/**
 * Entry point for running tests remotely for continuous integration
 * It has a long name to reduce the chance of having another test called the same
 * because this class will be skipped when running all tests
 */
@gw.testharness.ServerTest
@RunLevel(Runlevel.MULTIUSER)
class RemoteContinuousIntegrationRunnerTest extends TestBase {

  private static final var REPORT_DIR = "reportdir"
  private static final var PACKAGES_UNDER_TEST = "testpackage"
  private var _logger = LoggerCategory.TEST

  /**
   * Main method to run the tests
   */
  function testAll() {
    //_logger.info("**** testAlll " + new RunlevelWrapper().getCurrentServerRunlevel() + "START **** ")
    _logger.info("**** testAlll " + new RunlevelWrapper().CurrentServerRunlevel + "START **** ")
    var testPackages = packages()
    var reportDir = System.getProperty(REPORT_DIR)
    if (testPackages == null || reportDir == null) {
      fail("Missing environment properties, testpackage and reportdir are required.")
    }
    deleteReportFiles(reportDir)
    GUnitTestRunner.runTestsInPackagesArrayWithXmlReport(testPackages, reportDir)
    _logger.info("**** testAll END **** " )
  }

  private function deleteReportFiles(reportDir: String) {
    var rptDir = new File(reportDir)
    var oldFiles = rptDir.listFiles()
    if (oldFiles != null) {
      oldFiles.each(\oldFile -> {
        if (oldFile.Extension.endsWith("xml")) {
          oldFile.delete()
        }
      })
    }
  }

  private function packages(): String[] {
    var packageString = System.getProperty(PACKAGES_UNDER_TEST)
    if (packageString != null)
      return packageString.split(",")
    else
      return null
  }
}