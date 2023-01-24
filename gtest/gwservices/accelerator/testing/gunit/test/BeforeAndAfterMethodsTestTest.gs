package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.GUnitAssert
uses gwservices.accelerator.testing.gunit.TextTestRunner
uses gwservices.accelerator.testing.gunit.test.stubs.BeforeAndAfterMethodsTest

@ServerTest
@RunLevel(Runlevel.NONE)
class BeforeAndAfterMethodsTestTest extends TestBase {

  override function beforeMethod() {
    BeforeAndAfterMethodsTest.clearStaticState()
  }

  override function afterMethod(final possibleException : Throwable) {
    BeforeAndAfterMethodsTest.clearStaticState()
  }

  function testMethodsCalledInExpectedOrder() {
    var runner = new TextTestRunner()

    runner.runTestsInClass(BeforeAndAfterMethodsTest)

    var expectedMethodCalls = Arrays.asList({
        // on first instance:
        "beforeClass",
        "beforeMethod",
        "testOne",
        "afterMethod",
        //
        // on second instance:
        "beforeMethod",
        "testTwo",
        "afterMethod",
        //
        // on third instance:
        "beforeMethod",
        "testThree",
        "afterMethod",
        "afterClass"
      })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, BeforeAndAfterMethodsTest._methodNamesCalled)
  }

  function testInstances() {
    var runner = new TextTestRunner()

    runner.runTestsInClass(BeforeAndAfterMethodsTest)

    var expectedMethodCalls = Arrays.asList({
        "testOne",
        "testTwo",
        "testThree"
      })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, BeforeAndAfterMethodsTest._testNameToInstanceMap.keySet())
    expectedMethodCalls = Arrays.asList({
        "beforeClass",
        "beforeMethod",
        "testOne",
        "afterMethod"
      })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, getCallsForMethod("testOne"))
    expectedMethodCalls = Arrays.asList({
        "beforeMethod",
        "testTwo",
        "afterMethod"
      })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, getCallsForMethod("testTwo"))
    expectedMethodCalls = Arrays.asList({
        "beforeMethod",
        "testThree",
        "afterMethod",
        "afterClass"
      })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, getCallsForMethod("testThree"))
  }

  private static function getCallsForMethod(final methodName : String) : List<String> {
    final var methodsCalled = BeforeAndAfterMethodsTest._testNameToInstanceMap
    assertTrue("Expected method <" + methodName + "> to be called, but it was not. Methods called: " + methodsCalled.Keys.toString(),
        methodsCalled.containsKey(methodName))
    final var testInstance = methodsCalled[methodName]
    return BeforeAndAfterMethodsTest._instanceToMethodNamesCalledMap[testInstance]
  }

}
