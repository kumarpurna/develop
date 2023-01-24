package com.pwc.testcase.policyChange

uses com.pwc.policyBuilder.PolicyBuilderMain
uses gw.api.util.DateUtil
uses gw.testharness.TestBase

class BA_PolicyChangeTest extends TestBase {

  function testValidateVehicles() {
    var polPeriod = new PolicyBuilderMain().createBAPolicyChange()
    assertTrue(polPeriod.BusinessAutoLine.Vehicles.HasElements)
  }

  function testValidateFleetType() {
    var pb = new PolicyBuilderMain()
    var polPeriod = pb.createBAPolicyChange()
    assertTrue(polPeriod.BusinessAutoLine.Fleet == FleetType.get(pb.getBAProperties().getProperty("vehicleFleetType")))
  }

  function testDriverAge() {
    var policyPeriod = PolicyBuilderMain.createBAPolicyChange()
    var drivers = policyPeriod.BusinessAutoLine.getDrivers()

    if(drivers.HasElements) {

      drivers.each(\driver -> {
        var isSuccess = validateDriverAge(driver)
        assertTrue("No Valid age for the driver ${driver}" , isSuccess)
      })
    }
  }

  function validateDriverAge(driver : CommercialDriver) : boolean {
    var dob = driver.DateOfBirth
    var days = dob.daysBetween(DateUtil.currentDate())
    var years = days/365
    var months = days%365
    if(months > 0) years+=1
    return years>=16&&years<=120
  }


  function testVehicleVIN() {
    var policyPeriod = PolicyBuilderMain.createBAPolicyChange()
    var vehicles = policyPeriod.BusinessAutoLine.Vehicles
    if(vehicles.HasElements) {
      vehicles.each(\vehicle -> {
        var isSuccess = validateVehicleVIN(vehicle)
        assertTrue("No Valid VIN for the Vehicle ${vehicle}", isSuccess)
      })
    }
  }

  function validateVehicleVIN(vehicle : BusinessVehicle) : boolean {
    var vin = vehicle.Vin
    return vin.matches(".+")
  }
}