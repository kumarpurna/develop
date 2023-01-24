package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

/**
 * Test class with two passing tests.
 */
@ServerTest
@RunLevel(Runlevel.NONE)
class TwoPassingTest extends TestBase {

  function testOne() {
    // This test always passes.
  }

  function testTwo() {
    // This test always passes.
  }

}
