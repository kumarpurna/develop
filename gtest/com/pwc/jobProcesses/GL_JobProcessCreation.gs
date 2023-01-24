package com.pwc.jobProcesses

uses com.pwc.policyBuilder.gl.GLSampleData
uses gw.testharness.TestBase

class GL_JobProcessCreation {

  public function testGLQuote(properties : Properties){
    var sampleData = new GLSampleData()
    var period = sampleData.buildPolicyPeriod(properties)

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var policyperiod = bundle.add(period)
      policyperiod.JobProcess.requestQuote()
    })
  }

  public function testCreateGLPolicy(properties : Properties){
    var sampleData = new GLSampleData()
    var period = sampleData.buildPolicyPeriod(properties)

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var policyperiod = bundle.add(period)
      policyperiod.JobProcess.requestQuote()
      policyperiod.JobProcess.bind()
    })
  }
}