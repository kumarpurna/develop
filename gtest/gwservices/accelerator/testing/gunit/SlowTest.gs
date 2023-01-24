package gwservices.accelerator.testing.gunit

uses gw.lang.annotation.AnnotationUsage
uses gw.testharness.DoesNotAffectDependencies

/**
 * Use this annotation to mark GUnit test classes that are partiularly slow.
 * This enables the user to skip them, running only the relatively faster tests.
 * This enables the user to run most of the tests in a few minutes, rather than
 * having to wait several hours for all the tests to run.
 *
 * In Carbon it's recommended that you use 'implements ISlowTest' instead of using
 * this annotation because Gosu annotations cause the Guidewire Studio GUnit test
 * runner to fail, in spite of the '@DoesNotAffectDependencies' annotation below.
 * This has been reported by Customer Portal Reference Number 110427-000005, by
 * Jeff Grigg.  We hope for this problem to be a Guidewire Platform JIRA, to be
 * fixed in the Diamond release, or later.
 */
@AnnotationUsage(gw.lang.annotation.UsageTarget.TypeTarget, gw.lang.annotation.UsageModifier.One)
@DoesNotAffectDependencies
class SlowTest implements IAnnotation {
}
