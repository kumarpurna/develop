package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel

interface IRunlevelAccessor {

  /**
   * @return <code>Runlevel.getCurrent()</code> in production; mock values in GUnit tests.
   */
  property get CurrentServerRunlevel() : Runlevel

}
