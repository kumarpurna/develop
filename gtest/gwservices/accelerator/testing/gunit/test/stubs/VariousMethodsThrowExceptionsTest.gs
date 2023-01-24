package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
class VariousMethodsThrowExceptionsTest extends TestBase {

  public static var _methodNamesCalled : List<String> = new ArrayList<String>()
  public static var _beforeClassExceptionToThrow : Throwable = null
  public static var _beforeMethodExceptionToThrow : Throwable = null
  public static var _mainTestMethodExceptionToThrow : Throwable = null
  public static var _afterMethodExceptionToThrow : Throwable = null
  public static var _afterClassExceptionToThrow : Throwable = null

  static function clearStaticState() {
    _methodNamesCalled.clear()
    _beforeClassExceptionToThrow = null
    _beforeMethodExceptionToThrow = null
    _mainTestMethodExceptionToThrow = null
    _afterMethodExceptionToThrow = null
    _afterClassExceptionToThrow = null
  }

  override function beforeClass() {
    logMethodCall("beforeClass")
    if (_beforeClassExceptionToThrow != null)
      throw _beforeClassExceptionToThrow
  }

  override function beforeMethod() {
    logMethodCall("beforeMethod")
    if (_beforeMethodExceptionToThrow != null)
      throw _beforeMethodExceptionToThrow
  }

  function testThrowsException() {
    logMethodCall("testThrowsException")
    if (_mainTestMethodExceptionToThrow != null)
      throw _mainTestMethodExceptionToThrow
  }

  override function afterMethod(possibleException : Throwable) {
    logMethodCall("afterMethod(" + ((possibleException == null) ? "null" : "ex") + ")")
    if(_mainTestMethodExceptionToThrow == null){
      assertSame(_mainTestMethodExceptionToThrow, possibleException)
    } else {
      assertSame(_mainTestMethodExceptionToThrow, possibleException.Cause)
    }
    if (_afterMethodExceptionToThrow != null) {
      throw _afterMethodExceptionToThrow
    }
  }

  override function afterClass() {
    logMethodCall("afterClass")
    if (_afterClassExceptionToThrow != null)
      throw _afterClassExceptionToThrow
  }

  private function logMethodCall(methodName : String) {
    _methodNamesCalled.add(methodName)
  }

}
