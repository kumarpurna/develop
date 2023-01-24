package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.TestBase

//@ServerTest
@RunLevel(Runlevel.NONE)
class DoesNotHaveServerTestAnnotationTest extends TestBase {

  function testNothing() {
    // GUnit runs this test in spite of the lack of '@ServerTest' annotation. See TestRunnerTest.
  }

}
