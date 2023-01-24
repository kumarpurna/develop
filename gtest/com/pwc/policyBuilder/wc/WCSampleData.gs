package com.pwc.policyBuilder.wc

uses com.pwc.common.AbstractDataBuilder
uses com.pwc.common.AccountSampleDataUtil
uses com.pwc.common.LocationSampleDataUtil
uses gw.api.builder.SubmissionBuilder
uses gw.api.databuilder.wc.WCCoveredEmployeeBuilder
uses gw.api.databuilder.wc.WorkersCompLineBuilder
uses gw.pl.persistence.core.Bundle

class WCSampleData extends AbstractDataBuilder {

  protected override function buildSubmissionBuilder(bundle : Bundle, properties : Properties) : PolicyPeriod {
    var submissionBuilder = new SubmissionBuilder()
    submissionBuilder.withProduct(properties.getProperty("Product"))
    submissionBuilder.withBaseState(Jurisdiction.get((properties.getProperty("jurisdiction"))))
    submissionBuilder.isDraft()
    var locationSampleDataUtil = new LocationSampleDataUtil(properties)
    var accountSampleDataUtil = new AccountSampleDataUtil(locationSampleDataUtil, properties)
    var account = accountSampleDataUtil.createOrGetAccount(bundle)

    var coveredEmployee = new WCCoveredEmployeeBuilder()
    var policyLine = new WorkersCompLineBuilder().withWCCoveredEmployee(coveredEmployee)

    submissionBuilder.withAccount(account)
    submissionBuilder.withPolicyLine(policyLine)
    submissionBuilder.withProducer(accountSampleDataUtil.createOrGetProducerCode())
    var policyPeriod = submissionBuilder.create(bundle)
    policyPeriod.syncOffering()
    policyPeriod.syncQuestions()
    policyPeriod.syncPolicyTerm()
    policyPeriod.syncPolicyLines()
    policyPeriod.WorkersCompLine.recalculateGoverningClasscode()
    policyPeriod.WorkersCompLine.Jurisdictions.each(\jur -> {
      jur.syncCoverages()
    })

    return policyPeriod
  }
}