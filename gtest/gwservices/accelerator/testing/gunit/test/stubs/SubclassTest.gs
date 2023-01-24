package gwservices.accelerator.testing.gunit.test.stubs

uses gw.api.system.server.Runlevel
uses gw.testharness.RunLevel
uses gw.testharness.ServerTest

@ServerTest
@RunLevel(Runlevel.NONE)
class SubclassTest extends AbstractBaseClassTest {

  function testInSubclass() {
    logMethodCall("testInSubclass")
  }

}
