package gwservices.accelerator.testing.gunit.test

uses gw.api.system.PLLoggerCategory
uses org.slf4j.Logger

class GUnitTestingLoggerCategory extends PLLoggerCategory {

  public static final var GUNIT_MAIN_TEST : Logger = createLogger("GUnit.MainTest")   // "main.MainTest" runner

}