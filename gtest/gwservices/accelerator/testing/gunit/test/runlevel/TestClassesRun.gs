package gwservices.accelerator.testing.gunit.test.runlevel

uses gw.api.system.server.Runlevel
uses java.util.TreeSet

abstract class TestClassesRun {

  public static final var V3_UNIT:String = "V3_UNIT"
  public static final var V3_INTEGRATION:String = "V3_INTEGRATION"
  public static var _runlevelsCalled : TreeSet<Runlevel> = new TreeSet<Runlevel>()
  public static var _v3TestsCalled : TreeSet<String> = new TreeSet<String>()

  static function clearStaticState() {
    _runlevelsCalled.clear()
    _v3TestsCalled.clear()
  }

  private construct() {
  }

}
