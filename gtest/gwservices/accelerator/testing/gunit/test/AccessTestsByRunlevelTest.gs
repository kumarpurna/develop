package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase
uses gwservices.accelerator.testing.gunit.IRunlevelAccessor
uses gwservices.accelerator.testing.gunit.TextTestRunner
uses gwservices.accelerator.testing.gunit.test.runlevel.RunlevelDefaultTest
uses gwservices.accelerator.testing.gunit.test.runlevel.RunlevelNoneTest
uses gwservices.accelerator.testing.gunit.test.runlevel.TestClassesRun

@ServerTest
@RunLevel(Runlevel.NONE)
class AccessTestsByRunlevelTest extends TestBase {

  override function beforeMethod() {
    TestClassesRun.clearStaticState()
    RunlevelDefaultTest._testsInThisClassWereRun = false
  }

  override function afterMethod(final possibleException : Throwable) {
    TestClassesRun.clearStaticState()
    RunlevelDefaultTest._testsInThisClassWereRun = false
  }

  function testCaptureWebServerStartupMessages() {
  }

  /**
   * <code>Runlevel.NONE</code> is the run level for Gosu Tester when Guidewire Studio is <b>not</b> connected to a web server.
   * Because this is the lowest possible run level, only "<code>@RunLevel(Runlevel.NONE)</code>" tests will be run.
   */
  function testRunlevelNONE() {
    final var runner = new MockTextTestRunner(Runlevel.NONE)

    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)

    assertEquals("[NONE]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertFalse("Expecting that the tests in RunlevelDefaultTest class should NOT be run, as the default Runlevel is MULTIUSER.", RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("PassingTests", 2, runner.TestReporter.PassingTests)
    assertEquals("FailingTests", 0, runner.TestReporter.FailingTests)
    assertEquals("TotalTests", 2, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel", 7, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  function testRunlevelGUIDEWIRE_STARTUP() {
    final var runner = new MockTextTestRunner(Runlevel.GUIDEWIRE_STARTUP)

    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)

    assertEquals("[NONE, GUIDEWIRE_STARTUP]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertFalse("Expecting that the tests in RunlevelDefaultTest class should NOT be run, as the default Runlevel is MULTIUSER.", RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("TotalTests", 3, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel", 6, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  function testRunlevelSHUTDOWN() {
    final var runner = new MockTextTestRunner(Runlevel.SHUTDOWN)

    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)

    assertEquals("[NONE, GUIDEWIRE_STARTUP, SHUTDOWN]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertFalse("Expecting that the tests in RunlevelDefaultTest class should NOT be run, as the default Runlevel is MULTIUSER.", RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("TotalTests", 4, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel", 5, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  function testRunlevelNODAEMONS() {
    final var runner = new MockTextTestRunner(Runlevel.NODAEMONS)

    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)

    assertEquals("[NONE, GUIDEWIRE_STARTUP, SHUTDOWN, NODAEMONS]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertFalse("Expecting that the tests in RunlevelDefaultTest class should NOT be run, as the default Runlevel is MULTIUSER.", RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("TotalTests", 5, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel", 4, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  function testRunlevelDAEMONS() {
    final var runner = new MockTextTestRunner(Runlevel.DAEMONS)

    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)

    assertEquals("[NONE, GUIDEWIRE_STARTUP, SHUTDOWN, NODAEMONS, DAEMONS]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertFalse("Expecting that the tests in RunlevelDefaultTest class should NOT be run, as the default Runlevel is MULTIUSER.", RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("TotalTests", 6, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel (MULTIUSER and RunlevelDefaultTest)", 3, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  /**
   * <code>Runlevel.MULTIUSER</code> is the run level for Gosu Tester when Guidewire Studio <b>is</b> connected to a web server.
   * Because this is the highest run level, all tests will be run.
   */
  function testRunlevelMULTIUSER() {
    final var runner = new MockTextTestRunner(Runlevel.MULTIUSER)
    runner.runTestsInPackage(RunlevelNoneTest.Type.Namespace)
    assertEquals("[NONE, GUIDEWIRE_STARTUP, SHUTDOWN, NODAEMONS, DAEMONS, MULTIUSER]", TestClassesRun._runlevelsCalled.toString())
    assertEquals("[" + TestClassesRun.V3_INTEGRATION + ", " + TestClassesRun.V3_UNIT + "]", TestClassesRun._v3TestsCalled.toString())
    assertTrue("Expecting that the tests in RunlevelDefaultTest class SHOULD run, as the default Runlevel is MULTIUSER -- which is the run level that this test simulates.",
        RunlevelDefaultTest._testsInThisClassWereRun)
    assertEquals("TotalTests (7 listed above + RunlevelDefaultTest)", 8 + 1, runner.TestReporter.TotalTests)
    assertEquals("TestClassesSkippedDueToRunlevel", 0, runner.TestReporter.TestClassesSkippedDueToRunlevel)
  }

  function testCaptureWebServerShutdownMessages() {
  }

  private static class MockTextTestRunner extends TextTestRunner {

    construct(final simulatedServerRunlevel : Runlevel) {
      super(new MockRunLevelAccessor(simulatedServerRunlevel))
    }

  }

  private static class MockRunLevelAccessor implements IRunlevelAccessor {

    var _simulatedServerRunlevel : Runlevel as readonly CurrentServerRunlevel = null

    construct(final simulatedServerRunlevel : Runlevel) {
      _simulatedServerRunlevel = simulatedServerRunlevel
    }
  }
}