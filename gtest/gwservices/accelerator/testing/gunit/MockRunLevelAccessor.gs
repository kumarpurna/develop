package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel

class MockRunLevelAccessor implements IRunlevelAccessor {

  var _simulatedServerRunlevel: Runlevel

  construct(simulatedServerRunlevel: Runlevel) {
    _simulatedServerRunlevel = simulatedServerRunlevel
  }

  override property get CurrentServerRunlevel(): Runlevel {
    return _simulatedServerRunlevel
  }

}