package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.*

uses gwservices.accelerator.testing.gunit.GUnitAssert
uses gwservices.accelerator.testing.gunit.test.stubs.AbstractBaseClassTest
uses gwservices.accelerator.testing.gunit.test.stubs.SubclassTest
uses gwservices.accelerator.testing.gunit.TextTestRunner

uses java.lang.Throwable
uses java.util.Arrays

@ServerTest
@RunLevel(Runlevel.NONE)
class AbstractBaseAndSubclassTest extends TestBase {

  override function beforeMethod() {
    AbstractBaseClassTest.clearStaticState()
  }

  override function afterMethod(final possibleException : Throwable) {
    AbstractBaseClassTest.clearStaticState()
  }

  function testSequenceOfSuperAndSubclassMethodCalls() {
    final var runner = new TextTestRunner()
    runner.runTestsInClass(SubclassTest.Type)
    final var expectedMethodCalls = Arrays.asList({
        "base: beforeClass",
        "base: beforeMethod",
        "testInSubclass",
        "base: afterMethod",
        "base: afterClass"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, SubclassTest._methodNamesCalled)
  }
}