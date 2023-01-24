package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.api.util.ConfigAccess
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

uses java.io.File

@ServerTest
@RunLevel(Runlevel.NONE)
class DefaultPackageListTest extends TestBase {

  function testNothing() {
  }

  function _DISABLED_test() {
//    final var test = new MainTest()

    final var actualPackages : List<String> = null //new TreeSet<String>(MainTest.DEFAULT_PACKAGE_LIST.split(",").toList())

    final var configurationDirectory = ConfigAccess.getModuleRoot("configuration").AbsolutePath
    final var gtestDirectory = new File(configurationDirectory + File.separatorChar + "gtest")
    final var expectedPackages = new TreeSet<String>(
        gtestDirectory
            .Children
            .where(\ childDir -> childDir.Directory and childDir.NameSansExtension != "main")
            .map(\ childDir -> childDir.NameSansExtension))
    assertEquals("MainTest.DEFAULT_PACKAGE_LIST;", expectedPackages, actualPackages)
  }
}