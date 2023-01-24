package com.pwc.testcase.rewrite
uses com.pwc.policyBuilder.PolicyBuilderMain
uses gw.api.util.DateUtil
uses gw.testharness.TestBase

class BA_RewriteTest extends TestBase {

  function testValidateVehicles() {
    var polPeriod = new PolicyBuilderMain().createBARewrite()
    assertTrue(polPeriod.BusinessAutoLine.Vehicles.HasElements)
  }

  function testValidateFleetType() {
    var pb = new PolicyBuilderMain()
    var polPeriod = pb.createBARewrite()
    assertTrue(polPeriod.BusinessAutoLine.Fleet == FleetType.get(pb.getBAProperties().getProperty("vehicleFleetType")))
  }
}
