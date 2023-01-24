package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.*
uses junit.framework.AssertionFailedError
uses java.util.Collections
uses java.lang.Throwable

/**
 * This GUnit test tests the non-GUnit test methods in the <code>TestMethodsThatShouldNotBeCalledTest</code> class.
 * It is important that those "useless" and "unused" methods exist in that class, as a test for the accelerator GUnit
 * test runners.
 *
 * This GUnit test, implemented in this test, should be called. And all the test methods in this class must conform
 * to the GUnit test standards, and be called.
 */
@ServerTest
@RunLevel(Runlevel.NONE)
class TestMethodsThatShouldNotBeCalledTestTest extends TestBase {

  /**
   * There must be a <code>private function testPrivate()</code> method in the other class that throws an exception if
   * called. No test runners should ever call it.
   */
  function testPrivate() {
    final var testPrivate = TestMethodsThatShouldNotBeCalledTest.Type.TypeInfo.DeclaredMethods
        .singleWhere(\ method -> method.DisplayName == "testPrivate")

    assertTrue("The 'testPrivate' method should have 'private' access, but it does not.", testPrivate.Private)

    final var instance = new TestMethodsThatShouldNotBeCalledTest()
    try {
      testPrivate.CallHandler.handleCall(instance, null)
      throw "Expected AssertionFailedError."
    } catch (afe : AssertionFailedError) {
      assertEquals("This method should never be called by a GUnit test runner because it is a private method.",
          afe.Message)
    }
  }

  /**
   * There must be a <code>protected function testProtected()</code> method in the other class that throws an exception
   * if called. No test runners should ever call it.
   */
  function testProtected() {
    final var testProtected = TestMethodsThatShouldNotBeCalledTest.Type.TypeInfo.DeclaredMethods
        .singleWhere(\ method -> method.DisplayName == "testProtected")

    assertTrue("The 'testProtected' method should have 'private' access, but it does not.", testProtected.Protected)

    final var instance = new TestMethodsThatShouldNotBeCalledTest()
    try {
      testProtected.CallHandler.handleCall(instance, null)
      throw "Expected AssertionFailedError."
    } catch (afe : AssertionFailedError) {
      assertEquals("This method should never be called by a GUnit test runner because it is a protected method.",
          afe.Message)
    }
  }

  /**
   * There must be a <code>function testThrowableParameter(ignored : Throwable)</code> method in the other class that
   * throws an exception if called. No test runners should ever call it.
   */
  function testThrowableParameter() {
    final var testThrowableParameter = TestMethodsThatShouldNotBeCalledTest.Type.TypeInfo.DeclaredMethods
        .singleWhere(\ method -> method.DisplayName == "testThrowableParameter")

    assertEquals("The 'testThrowableParameter' method should have a non-empty parameter list."
        + " We explicity expect this type:",
        {Throwable}, testThrowableParameter.Parameters.map(\ param -> param.FeatureType).toList())

    final var instance = new TestMethodsThatShouldNotBeCalledTest()
    try {
      instance.testThrowableParameter(null)
      throw "Expected AssertionFailedError."
    } catch (afe : AssertionFailedError) {
      assertEquals("This method should never be called by a GUnit test runner because it takes a parameter.",
          afe.Message)
    }
  }

  /**
   * There must be a <code>function testReturnsInt() : int</code> method in the other class that return an
   * <code>int</code> value, and throws an exception if called. No test runners should ever call it.
   */
  function testReturnsInt() {
    final var testReturnsInt = TestMethodsThatShouldNotBeCalledTest.Type.TypeInfo.DeclaredMethods
        .singleWhere(\ method -> method.DisplayName == "testReturnsInt")

    assertEquals("The 'testReturnsInt' method should have a 'int' return type;",
        int.Type, testReturnsInt.ReturnType)

    final var instance = new TestMethodsThatShouldNotBeCalledTest()
    try {
      instance.testReturnsInt()
      throw "Expected AssertionFailedError."
    } catch (afe : AssertionFailedError) {
      assertEquals("This method should never be called by a GUnit test runner because it has a non-void return type.",
          afe.Message)
    }
  }

  /**
   * Test that all the GUnit test methods in the current class (including this one) conform with all the requirements
   * of GUnit test methods. This is done to detect any possible cases where a programmer may be confused about how
   * to code methods in this class and the <code>TestMethodsThatShouldNotBeCalledTest</code> class, and may make the
   * mistake of copying a method from there to here (just because the test method names are the same).
   */
  function testAllTestMethodDeclarationsInThisClass() {
    // Each and every test method...
    for (method in TestMethodsThatShouldNotBeCalledTestTest.Type.TypeInfo.DeclaredMethods) {
      // must start with "test"    (That's how we choose to recognize them here.)
      if (method.DisplayName.startsWith("test")) {
        // and have 'public' access
        assertTrue("All test methods in this class should be 'public'. <" + method.Name + "> is not.", method.Public)
        // and have an empty parameter list
        assertEquals("All test methods in this class should have an empty parameter list."
            + " <" + method.Name + "> has an issue:",
            Collections.EMPTY_LIST, method.Parameters.toList())
        // and have a 'void' return type.  (or no return type declared, as per Gosu coding conventions.)
        assertEquals("All test methods in this class should have a 'void' return type."
            + " <" + method.Name + "> has an issue:",
            void.Type, method.ReturnType)
      }
    }
  }

}