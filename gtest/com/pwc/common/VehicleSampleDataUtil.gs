package com.pwc.common


uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.databuilder.ba.BAVehicleBuilder

class VehicleSampleDataUtil {

  public static final var VIN_KEY : String = "TEST_VIN"

  public function createTrunkBuilder(properties : Properties): BAVehicleBuilder {

    var trunk = new BAVehicleBuilder()
        .withYear(properties.getProperty("vehicle1_year").toInt())
        .withMake(properties.getProperty("vehicle1_make"))
        .withModel(properties.getProperty("vehicle1_model"))
        .withClassCode(properties.getProperty("vehicle1_classcode"))
        .withVIN(generateVinNumber())
    return trunk
  }

  public static function generateVinNumber() : String {
    return VIN_KEY + UniqueKeyGenerator.get().nextID()
  }
}