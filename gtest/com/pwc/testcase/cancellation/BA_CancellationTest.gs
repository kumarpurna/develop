package com.pwc.testcase.cancellation

uses com.pwc.policyBuilder.PolicyBuilderMain
uses gw.testharness.TestBase

class BA_CancellationTest extends TestBase {

  function testValidateVehicles() {
    var polPeriod = new PolicyBuilderMain().createBACancellation()
    assertTrue(polPeriod.BusinessAutoLine.Vehicles.HasElements)
  }

  function testValidateFleetType() {
    var pb = new PolicyBuilderMain()
    var polPeriod = pb.createBACancellation()
    assertTrue(polPeriod.BusinessAutoLine.Fleet == FleetType.get(pb.getBAProperties().getProperty("vehicleFleetType")))
  }
}