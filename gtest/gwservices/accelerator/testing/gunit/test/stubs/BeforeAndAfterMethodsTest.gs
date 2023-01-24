package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
class BeforeAndAfterMethodsTest extends TestBase {

  public static var _methodNamesCalled              : List<String>                                 = new ArrayList<String>()                                // List of all method names called, on all instances of this class, in sequence.
  public static var _testNameToInstanceMap          : Map<String, BeforeAndAfterMethodsTest>       = new LinkedHashMap<String, BeforeAndAfterMethodsTest>() // For each "test*" method, the instance of the test class that was used for that test.
  public static var _instanceToMethodNamesCalledMap : Map<BeforeAndAfterMethodsTest, List<String>> = new HashMap<BeforeAndAfterMethodsTest, List<String>>() // For a given instance of this class, what method names were called on it.

  static function clearStaticState() {
    _methodNamesCalled.clear()
    _instanceToMethodNamesCalledMap.clear()
    _testNameToInstanceMap.clear()
  }

  construct() {
    assertFalse("It should be impossible for an instance to be in the map before it's constructed!",
        _instanceToMethodNamesCalledMap.containsKey(this))
    // Initialize method tracking list for this instance:
    _instanceToMethodNamesCalledMap[this] = new ArrayList<String>()
  }


  /**
   * Should be called once, on the first instance of this class.
   */
  override function beforeClass() {
    logEveryMethodCall("beforeClass")
  }

  /**
   * Should be called once on each instance, right before calling the "test*" method.
   */
  override function beforeMethod() {
    logEveryMethodCall("beforeMethod")
  }

  function testOne() {
    logTestMethodCall("testOne")
  }

  function testTwo() {
    logTestMethodCall("testTwo")
  }

  function testThree() {
    logTestMethodCall("testThree")
  }

  /**
   * Should be called once on each instance, right <b>after</b> calling the "test*" method.
   */
  override function afterMethod(final possibleException : Throwable) {
    logEveryMethodCall("afterMethod")
  }

  /**
   * Should be called once, on the "last" instance, just after calling the "test*" method and (after)
   * <code>afterMethod</code>.
   */
  override function afterClass() {
    logEveryMethodCall("afterClass")
  }


  private function logTestMethodCall(final methodName : String) {
    logEveryMethodCall(methodName)
    _testNameToInstanceMap.put(methodName, this)
  }

  private function logEveryMethodCall(final methodName : String) {
    _methodNamesCalled.add(methodName)
    _instanceToMethodNamesCalledMap[this].add(methodName)
  }

}