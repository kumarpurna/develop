package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest
uses gw.testharness.TestBase

@ServerTest
@RunLevel(Runlevel.NONE)
class GUnitTest extends TestBase {

  function _DISABLED_testFirst() {}

  /**
   * Guidewire PL-7566 (closed on March 31st, 2010 without fixing it)
   *
   * Add the letter 'y' to the end of this method name to get this expected error message:
   * "Error while initializing gwservices.accelerator.testing.gunit.GUnitTest: junit.framework.AssertionFailedError: Test testXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXy has name of length 107which exceeds the max of 106"
   */
  function _DISABLED_testXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX() {}
  //                                                                                                                ^  = 106 chars
  //       12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
  //                1         2         3         4         5         6         7         8         9         0         1

  // The GUnit test runner CANNOT cope with test names of this lenth:
//  function testXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXY() {}

  function _DISABLED_testLast() {}

  function testNothing() {}

}
