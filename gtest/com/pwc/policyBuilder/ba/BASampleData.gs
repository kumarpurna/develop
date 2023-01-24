package com.pwc.policyBuilder.ba

uses com.pwc.common.AbstractDataBuilder
uses com.pwc.common.AccountSampleDataUtil
uses com.pwc.common.LocationSampleDataUtil
uses com.pwc.common.VehicleSampleDataUtil
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.databuilder.ba.BusinessAutoLineBuilder
uses gw.api.databuilder.ba.CommercialDriverBuilder
uses gw.pl.persistence.core.Bundle
uses typekey.*

class BASampleData extends AbstractDataBuilder {
   private var _policyType: String

  construct(policyType: String){
    this._policyType = policyType
  }

  protected override function buildSubmissionBuilder(bundle: Bundle,properties : Properties): PolicyPeriod {

    var submissionBuilder = new SubmissionBuilder().withProduct(properties.getProperty("Product"))
    var locationSampleDataUtil = new LocationSampleDataUtil(properties)
    var vehilcleSampleDataUtil = new VehicleSampleDataUtil()
    var accountSampleDataUtil = new AccountSampleDataUtil(locationSampleDataUtil, properties)
    var account = accountSampleDataUtil.createOrGetAccount(bundle)

    var policyLocation = new PolicyLocationBuilder().withLocationNumber(properties.getProperty("policyLocationNumber").toInt())
                         .withCode(properties.getProperty("policyLocationCode"))
                          .withName(properties.getProperty("policyLocationName"))
                          .withState(State.get(properties.getProperty("policyLocationState")))
    var lineBuilder = new BusinessAutoLineBuilder()
    lineBuilder.withVehicle(vehilcleSampleDataUtil.createTrunkBuilder(properties))
    lineBuilder.withFleet(FleetType.get(properties.getProperty("vehicleFleetType")))
    lineBuilder.withPolicyType(typekey.BAPolicyType.get(properties.getProperty("BAPolicyType")))
        .withCoverage(new CoverageBuilder(BAOwnedLiabilityCov)
            .withPatternCode(properties.getProperty("coveragePattern"))
            .withPackageCovTerm(properties.getProperty("packageCoverageTermPublicID"),
                properties.getProperty("packageCoverageTermValue")))
    lineBuilder.withDriver(new CommercialDriverBuilder().withFirstName(properties.getProperty("driver1_firstName"))
        .withLastName(properties.getProperty("driver1_lastName"))
        .withBirthday(new Date(properties.getProperty("driver1_dob")))
    )


    submissionBuilder.withAccount(account)
    submissionBuilder.withPolicyLocation(policyLocation)
    submissionBuilder.withPolicyLine(lineBuilder)
    submissionBuilder.withProducer(accountSampleDataUtil.createOrGetProducerCode())


    submissionBuilder.withBaseState(typekey.Jurisdiction.get(properties.getProperty("BaseState"))).isDraft()
    var policyPeriod = submissionBuilder.create(bundle)
    policyPeriod.syncOffering()
    policyPeriod.syncQuestions()
    policyPeriod.syncPolicyTerm()
    policyPeriod.syncPolicyLines()
    policyPeriod.BusinessAutoLine.syncCoverageSymbolGroups()
    policyPeriod.BusinessAutoLine.syncJurisdictions()
    policyPeriod.BusinessAutoLine.AllModifiables.each(\modi -> {
      modi.syncModifiers()
    })
    policyPeriod.BusinessAutoLine.Jurisdictions.each(\elt -> {
      elt.syncCoverages()
    })

    return policyPeriod
  }
  function postOnChange(coverable: Coverable){
    (coverable.PolicyLine as BusinessAutoLine).syncCoverageSymbolGroups()
    (coverable.PolicyLine as BusinessAutoLine).syncJurisdictions()
    coverable.syncCoverages()
    coverable.syncConditions()
    coverable.syncExclusions()
  }



}