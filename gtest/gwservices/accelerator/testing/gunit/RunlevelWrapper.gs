package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel

class RunlevelWrapper implements IRunlevelAccessor {

  /**
   * @return <code>Runlevel.getCurrent()</code> in production.
   */
  override  property get CurrentServerRunlevel() : Runlevel {
    return Runlevel.getCurrent()
  }

}
