package gwservices.accelerator.testing.gunit

uses gwservices.accelerator.testing.gunit.test.GUnitTestingLoggerCategory

uses java.io.File
uses java.io.FileWriter
uses java.io.IOException

/**
 * Utility class containing helper methods for the RemoteContinuousIntegrationRunnerTest class.
 */
class TestUtil {

  private static var LOGGER = GUnitTestingLoggerCategory.GUNIT_MAIN_TEST

  /**
   * Method to create the JUnit XML report file.
   */
  public static function createReport(final reportFileName : String, final data : String) {
    final var report = new StringBuffer()

    report.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
    report.append(data)

    var fw : FileWriter = null
    try {
      var reportFile = new File(reportFileName)
      reportFile.ParentFile.mkdirs()
      fw = new FileWriter(reportFile)
      fw.write(report.toString())
      fw.flush()
    } catch (ioException : IOException) {
      LOGGER.error("Failed to create report file <" + reportFileName + ">. Contents:\n" + data, ioException)
    } finally {
      if (fw != null) {
        try {
          fw.close()
        } catch (closeException : Exception) {
          // Discard close exceptions, with no logging or error reporting.
        }
      }
    }
  }

}
