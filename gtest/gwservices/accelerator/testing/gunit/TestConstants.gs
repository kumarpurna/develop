package gwservices.accelerator.testing.gunit

uses java.io.File

abstract class TestConstants {

  /**
   * Relative path of the project root directory.
   */
  public static final var PROJECT_ROOT_DIRECTORY_PATH : String = "./"

  /**
   * Relative path from the project root directory to the modules directory.
   */
  public static final var MODULES_DIRECTORY_PATH : String = PROJECT_ROOT_DIRECTORY_PATH + "modules/"

  /**
   * Relative path from the project root directory (the context in which GUnit
   * tests run) to the modules configuration directory, where customer-specific
   * configuration files reside.
   */
  public static final var MODULES_CONFIGURATION_DIRECTORY_PATH : String = MODULES_DIRECTORY_PATH + "configuration/"

  public static final var CONFIG_DIRECTORY_PATH : String = MODULES_CONFIGURATION_DIRECTORY_PATH + "config/"

  public static final var RESOURCES_DIRECTORY_PATH : String = CONFIG_DIRECTORY_PATH + "resources/"
  public static final var PRODUCTMODEL_DIRECTORY_PATH : String = RESOURCES_DIRECTORY_PATH + "productmodel/"

  public static final var PLUGIN_DIRECTORY_PATH : String = CONFIG_DIRECTORY_PATH + "plugin/"
  public static final var PLUGIN_REGISTRY_DIRECTORY_PATH : String = PLUGIN_DIRECTORY_PATH + "registry/"


  public static final var CUSTOMER_GSRC_PATH : String = MODULES_CONFIGURATION_DIRECTORY_PATH + "gsrc/"
  public static final var CUSTOMER_GTEST_PATH : String = MODULES_CONFIGURATION_DIRECTORY_PATH + "gtest/"

  static property get TestRoot() : File {
    var root = new File(CUSTOMER_GTEST_PATH)
    if (root.exists()) {
      return root
    }

    // If the gtest directory doesn't exist in the current path,
    // we may be running from Scratchpad, not connected to a server.
    // In this case, the gtest directory is in the classpath.
    var separator = System.getProperty("path.separator")
    var paths = System.getProperty("java.class.path").split(separator)
    var testRoot = paths.firstWhere(\ path -> path.endsWith("gtest"))
    if (testRoot != null) {
      return new File(testRoot)
    } else {
      throw new IllegalStateException("Can't find gtest directory")
    }
  }

  private construct() {
  }

}
