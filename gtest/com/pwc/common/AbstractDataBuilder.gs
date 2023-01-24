package com.pwc.common

uses gw.api.builder.CancellationBuilder

uses gw.api.builder.PolicyChangeBuilder
uses gw.api.builder.RenewalBuilder
uses gw.api.builder.RewriteBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.pl.persistence.core.Bundle

abstract class AbstractDataBuilder{

  protected abstract function buildSubmissionBuilder(bundle: Bundle, properties : Properties): PolicyPeriod

  public function buildPolicyPeriod( properties : Properties): PolicyPeriod{
    var policyPeriod: PolicyPeriod
    gw.transaction.Transaction.runWithNewBundle(\bundle ->{
      policyPeriod = buildSubmissionBuilder(bundle, properties)
    },"su")
    return policyPeriod
  }
}