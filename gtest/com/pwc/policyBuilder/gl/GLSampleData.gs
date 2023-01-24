package com.pwc.policyBuilder.gl

uses com.pwc.common.AbstractDataBuilder
uses com.pwc.common.AccountSampleDataUtil
uses com.pwc.common.LocationSampleDataUtil
uses gw.api.builder.SubmissionBuilder
uses gw.api.database.Query
uses gw.api.databuilder.gl.GeneralLiabilityLineBuilder
uses gw.pl.persistence.core.Bundle

class GLSampleData extends AbstractDataBuilder{

  protected override function buildSubmissionBuilder(bundle : Bundle, properties : Properties) : PolicyPeriod {
    var submissionBuilder = new SubmissionBuilder()
    submissionBuilder.withProduct(properties.getProperty("Product"))
    submissionBuilder.withBaseState(State.get(properties.getProperty("policyLocationState")))
    var locationSampleDataUtil = new LocationSampleDataUtil(properties)
    var accountSampleDataUtil = new AccountSampleDataUtil(locationSampleDataUtil, properties)
    var account = accountSampleDataUtil.createOrGetAccount(bundle)
    submissionBuilder.withAccount(account)
    submissionBuilder.withProducer(accountSampleDataUtil.createOrGetProducerCode())
    submissionBuilder.isDraft()
    var policyLineBuilder = new GeneralLiabilityLineBuilder()
    submissionBuilder.withPolicyLine(policyLineBuilder)
    var policyPeriod = submissionBuilder.create(bundle)
    var classCode = Query.make(GLClassCode).select().first()
    var temp = new GLExposure(policyPeriod)
    temp.setGLLine(policyPeriod.GLLine)
    temp.ClassCode = classCode
    temp.Location = policyPeriod.PolicyLocations.first()
    temp.BasisAmount = properties.getProperty("basicAmount").toInt()
    return policyPeriod
  }
}