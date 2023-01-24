package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.*

uses java.lang.Throwable

/**
 * When this test is run in the Guidewire Studio integrated GUnit test runner, only the "testNothing" runs.
 * The other "test-like" methods should not be run by the test runners. So the fact that they all "fail" (throw
 * exceptions) is <b>not a problem</b> because none of the "test-like" methods (except <code>testNothing</code>)
 * should <b>ever</b> be run. (...except by the GUnit test of this GUnit test class. ;-) If any of these "invalid",
 * "non-standards-conforming", "test-like" methods is ever called by a test runner, then they will be reported as
 * errors (test failures) by the test runner. And this indicates that the test runner needs to be fixed, not that
 * these "pseudo-test" methods should be deleted!!!
 */
@ServerTest
@RunLevel(Runlevel.NONE)
class TestMethodsThatShouldNotBeCalledTest extends TestBase {

  /**
   * This test method is required, due to the rule that all test classes must contain at least one runnable test method.
   */
  function testNothing() {
    // No test logic here. Specifically, do not throw any exception.
  }

  /**
   * This method should be <code>private</code>, making it "not a valid GUnit test method."
   */
  private function testPrivate() {
    fail("This method should never be called by a GUnit test runner because it is a private method.")
  }

  /**
   * This method should be <code>protected</code>, making it "not a valid GUnit test method."
   */
  protected function testProtected() {
    fail("This method should never be called by a GUnit test runner because it is a protected method.")
  }

  /**
   * This method has something in its declared parameter list, making it "not a valid GUnit test method."
   */
  function testThrowableParameter(ignored : Throwable) {
    fail("This method should never be called by a GUnit test runner because it takes a parameter.")
  }

  /**
   * This method has a non-<code>void</code> return type, making it "not a valid GUnit test method."
   */
  function testReturnsInt() : int {
    fail("This method should never be called by a GUnit test runner because it has a non-void return type.")
    return 42
  }

}