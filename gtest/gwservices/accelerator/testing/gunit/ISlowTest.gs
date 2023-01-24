package gwservices.accelerator.testing.gunit

/**
 * Implement this interface on GUnit test classes that are partiularly slow.
 * This enables the user to skip them, running only the relatively faster tests.
 * This enables the user to run most of the tests in a few minutes, rather than
 * having to wait several hours for all the tests to run.
 *
 * In the Diamond release or later, it should be possible to use the '@SlowTest'
 * annotation instead, and the tests should still run successfully in the Guidewire
 * Studio IDE.  (In Carbon, GUnit tests with the '@SlowTest' annotation can't be
 * run from within Guidewire Studio, due to a bug in the platform code.)
 */
interface ISlowTest {
}
