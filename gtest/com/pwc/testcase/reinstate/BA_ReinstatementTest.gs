package com.pwc.testcase.reinstate

uses com.pwc.policyBuilder.PolicyBuilderMain
uses gw.testharness.TestBase

class BA_ReinstatementTest extends TestBase {

  function testValidateVehicles() {
    var polPeriod = new PolicyBuilderMain().createBAReinstatement()
    assertTrue(polPeriod.BusinessAutoLine.Vehicles.HasElements)
  }

  function testValidateFleetType() {
    var pb = new PolicyBuilderMain()
    var polPeriod = pb.createBAReinstatement()
    assertTrue(polPeriod.BusinessAutoLine.Fleet == FleetType.get(pb.getBAProperties().getProperty("vehicleFleetType")))
  }
}