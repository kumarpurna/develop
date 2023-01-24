package gwservices.accelerator.testing.gunit

uses gw.api.util.ConfigAccess
uses gw.api.util.StringUtil

uses java.io.File

abstract class TestFileUtil {

  private construct() {
  }

  /**
   * @param testClassFile that is an executable class
   * @returns fully qualified class name for this file
   */
  public static function extractFullyQualifiedClassName(final testClassFile : File) : String {
    if (not testClassFile.Name.endsWith(".gs")) {
      throw "Expecting Gosu GUnit test class source file to end with a '.gs' extension."
          + " <" + testClassFile.Name + "> does not.\n"
          + "  File.AbsolutePath = <" + testClassFile.AbsolutePath + ">"
    }
    final var configurationDirectory = ConfigAccess.getModuleRoot("configuration").AbsolutePath
    var gtestDirectoryAbsolutePathPrefix = configurationDirectory + File.separatorChar + "gtest"
    final var classAbsoluteName = testClassFile.AbsolutePath.replaceAll(".gs", "")
    final var expectedPrefix = gtestDirectoryAbsolutePathPrefix + File.separator
    if (not classAbsoluteName.startsWith(expectedPrefix)) {
      throw "Expecting all GUnit test absolute path names to start with <" + expectedPrefix + ">."
          + " But this one does not: <" + classAbsoluteName + ">."
    }
    final var fullyQualifiedClassName =
        StringUtil.substring(classAbsoluteName, expectedPrefix.length, classAbsoluteName.length)
            .replace(File.separatorChar, '.')

    return fullyQualifiedClassName
  }
}
