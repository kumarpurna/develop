package com.pwc.jobProcesses

uses com.pwc.policyBuilder.wc.WCSampleData
uses gw.testharness.TestBase

class WC_JobProcessCreation {



  public function testWcQuote(properties : Properties){
    var sampleData = new WCSampleData()
    var period = sampleData.buildPolicyPeriod(properties)

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {

      var policyperiod = bundle.add(period)
      policyperiod.JobProcess.requestQuote()
    })
  }
  public function testCreateWcPolicy(properties : Properties){
    var sampleData = new WCSampleData()
    var period = sampleData.buildPolicyPeriod(properties)

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var policyperiod = bundle.add(period)
      policyperiod.JobProcess.requestQuote()
      policyperiod.JobProcess.bind()
    })
  }
}