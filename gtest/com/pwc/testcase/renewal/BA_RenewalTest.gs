package com.pwc.testcase.renewal
uses com.pwc.policyBuilder.PolicyBuilderMain
uses gw.testharness.TestBase

class BA_RenewalTest extends TestBase {

  function testValidateVehicles() {
    var polPeriod = new PolicyBuilderMain().createBARenewal()
    assertTrue(polPeriod.BusinessAutoLine.Vehicles.HasElements)
  }

  function testValidateFleetType() {
    var pb = new PolicyBuilderMain()
    var polPeriod = pb.createBARenewal()
    assertTrue(polPeriod.BusinessAutoLine.Fleet == FleetType.get(pb.getBAProperties().getProperty("vehicleFleetType")))
  }
}