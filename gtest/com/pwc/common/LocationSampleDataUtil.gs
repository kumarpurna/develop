package com.pwc.common

uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.PolicyLocationBuilder

class LocationSampleDataUtil {

  var properties : Properties

  public construct (prop : Properties) {
  this.properties = prop
  }

  public function createAccuntLocationBuilder(state: State) : AccountLocationBuilder {
     var primaryLocation = new AccountLocationBuilder().withLocationNumber(properties.getProperty("accountLocationNumber").toInt())
          .withCode(properties.getProperty("accountLocationCode")).withName(properties.getProperty("accountLocationName")).withState(state)
    return primaryLocation
  }

  public function createPolicyLocationBuilder(state: State) : PolicyLocationBuilder {
    var primaryLocation = new PolicyLocationBuilder().withLocationNumber(properties.getProperty("policyLocationNumber").toInt())
        .withCode(properties.getProperty("policyLocationCode")).withName(properties.getProperty("policyLocationName")).withState(state)
    return primaryLocation
  }


  public function createPolicyLocationBuilderWithAccountLocation(accountLocation: AccountLocation): PolicyLocationBuilder {
    var location =  new PolicyLocationBuilder().withAccountLocation(accountLocation)
    return location
  }

}