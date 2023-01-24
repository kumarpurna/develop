package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
abstract class AbstractBaseClassTest extends TestBase {

  public static final var _methodNamesCalled : List<String> = new ArrayList<String>()

  static function clearStaticState() {
    _methodNamesCalled.clear()
  }

  override function beforeClass() {
    logMethodCall("base: beforeClass")
  }

  override function beforeMethod() {
    logMethodCall("base: beforeMethod")
  }

  function tstInBaseClass() {
    logMethodCall("base: testInBaseClass")
  }

  override function afterMethod(possibleException : Throwable) {
    logMethodCall("base: afterMethod")
  }

  override function afterClass() {
    logMethodCall("base: afterClass")
  }

  protected static function logMethodCall(methodName : String) {
    _methodNamesCalled.add(methodName)
  }
}
