package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.GUnitAssert
uses gwservices.accelerator.testing.gunit.GUnitUtil
uses gwservices.accelerator.testing.gunit.TextTestRunner
uses gwservices.accelerator.testing.gunit.test.stubs.VariousMethodsThrowExceptionsTest

@ServerTest
@RunLevel(Runlevel.NONE)
class VariousMethodsThrowExceptionsTestTest extends TestBase {

  override function beforeMethod() {
    VariousMethodsThrowExceptionsTest.clearStaticState()
  }

  override function afterMethod(final possibleException : Throwable) {
    VariousMethodsThrowExceptionsTest.clearStaticState()
  }

  function testBeforeClassMethodThrowsException() {
    final var runner = new TextTestRunner()
    VariousMethodsThrowExceptionsTest._beforeClassExceptionToThrow = new Throwable("This exception thrown from beforeClass method causes test failure.")
    VariousMethodsThrowExceptionsTest._beforeMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._mainTestMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterClassExceptionToThrow = null

    GUnitUtil.captureStandardOutput(\ -> {
      GUnitUtil.captureStandardError(\ -> {
        runner.runTestsInClass(VariousMethodsThrowExceptionsTest.Type)
      })
    })

    final var expectedMethodCalls = Arrays.asList({
        "beforeClass"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, VariousMethodsThrowExceptionsTest._methodNamesCalled)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
  }

  function testBeforeMethodMethodThrowsException() {
    final var runner = new TextTestRunner()
    VariousMethodsThrowExceptionsTest._beforeClassExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._beforeMethodExceptionToThrow = new Throwable("This exception thrown from beforeMethod method causes test failure.")
    VariousMethodsThrowExceptionsTest._mainTestMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterClassExceptionToThrow = null

    GUnitUtil.captureStandardOutput(\ -> {
      GUnitUtil.captureStandardError(\ -> {
        runner.runTestsInClass(VariousMethodsThrowExceptionsTest.Type)
      })
    })

    final var expectedMethodCalls = Arrays.asList({
        "beforeClass",
        "beforeMethod"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, VariousMethodsThrowExceptionsTest._methodNamesCalled)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
  }

  function testMainTestMethodAndAllAfterMethodsThrowExceptions() {
    final var runner = new TextTestRunner()
    VariousMethodsThrowExceptionsTest._beforeClassExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._beforeMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._mainTestMethodExceptionToThrow = new Throwable("The main body of the test itself will throw this Throwable instance.")
    VariousMethodsThrowExceptionsTest._afterMethodExceptionToThrow = new Throwable("Exception thrown from afterMethod method will be silently discarded.")
    VariousMethodsThrowExceptionsTest._afterClassExceptionToThrow = new Throwable("Exception thrown from afterClass method will be silently discarded.")

    GUnitUtil.captureStandardOutput(\ -> {
      GUnitUtil.captureStandardError(\ -> {
        runner.runTestsInClass(VariousMethodsThrowExceptionsTest.Type)
      })
    })

    final var expectedMethodCalls = Arrays.asList({
        "beforeClass",
        "beforeMethod",
        "testThrowsException",
        "afterMethod(ex)",
        "afterClass"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, VariousMethodsThrowExceptionsTest._methodNamesCalled)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
  }

  function testOnlyAfterMethodsThrowExceptions() {
    final var runner = new TextTestRunner()
    VariousMethodsThrowExceptionsTest._beforeClassExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._beforeMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._mainTestMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterMethodExceptionToThrow = new Throwable("This exception thrown from afterMethod method causes test failure.")
    VariousMethodsThrowExceptionsTest._afterClassExceptionToThrow = new Throwable("Exception thrown from afterClass method will be silently discarded.")

    GUnitUtil.captureStandardOutput(\ -> {
      GUnitUtil.captureStandardError(\ -> {
        runner.runTestsInClass(VariousMethodsThrowExceptionsTest.Type)
      })
    })

    final var expectedMethodCalls = Arrays.asList({
        "beforeClass",
        "beforeMethod",
        "testThrowsException",
        "afterMethod(null)",
        "afterClass"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, VariousMethodsThrowExceptionsTest._methodNamesCalled)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
  }

  function testAfterClassMethodThrowsException() {
    final var runner = new TextTestRunner()
    VariousMethodsThrowExceptionsTest._beforeClassExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._beforeMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._mainTestMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterMethodExceptionToThrow = null
    VariousMethodsThrowExceptionsTest._afterClassExceptionToThrow = new Throwable("This exception thrown from afterClass method causes test failure.")

    GUnitUtil.captureStandardOutput(\ -> {
      GUnitUtil.captureStandardError(\ -> {
        runner.runTestsInClass(VariousMethodsThrowExceptionsTest.Type)
      })
    })

    final var expectedMethodCalls = Arrays.asList({
        "beforeClass",
        "beforeMethod",
        "testThrowsException",
        "afterMethod(null)",
        "afterClass"
    })
    GUnitAssert.assertCollectionStringValuesEquals(expectedMethodCalls, VariousMethodsThrowExceptionsTest._methodNamesCalled)
    assertEquals("FailingTests", 1, runner.TestReporter.FailingTests)
  }

}