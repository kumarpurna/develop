package com.pwc.jobProcesses

uses com.pwc.common.VehicleSampleDataUtil
uses com.pwc.policyBuilder.PolicyBuilderMain
uses com.pwc.policyBuilder.ba.BASampleData
uses gw.api.builder.CancellationBuilder
uses gw.api.builder.PolicyChangeBuilder
uses gw.api.builder.ReinstatementBuilder
uses gw.api.builder.RenewalBuilder
uses gw.api.builder.RewriteBuilder
uses gw.api.databuilder.ba.BusinessAutoLineBuilder
uses gw.api.databuilder.ba.CommercialDriverBuilder

class BA_JobProcessCreation {

  //Method to create Policy Period object for BA Line
  public function createPolicyPeriod(properties: Properties): PolicyPeriod {
    var BASampleData = new BASampleData("BA")
    return BASampleData.buildPolicyPeriod(properties)
  }

  //Submission Job
  public function BASubmission(policyPeriod: PolicyPeriod) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      policyPeriod = bundle.add(policyPeriod)
      policyPeriod.JobProcess.requestQuote()
      policyPeriod.JobProcess.bind()
    })
  }

  //Policy Change Job
  public function BAPolicyChange(policyperiod: PolicyPeriod) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {

      var properties = PolicyBuilderMain.getBAProperties()
      var vehilcleSampleDataUtil = new VehicleSampleDataUtil()
      var lineBuilder = new BusinessAutoLineBuilder()
      lineBuilder.withVehicle(vehilcleSampleDataUtil.createTrunkBuilder(properties))
      lineBuilder.withFleet(FleetType.get(properties.getProperty("vehicleFleetType")))
      lineBuilder.withDriver(new CommercialDriverBuilder().withFirstName(properties.getProperty("driver1_firstName"))
          .withLastName(properties.getProperty("driver1_lastName"))
          .withBirthday(new Date(properties.getProperty("driver1_dob")))
      )

      lineBuilder.withVehicle(vehilcleSampleDataUtil.createTrunkBuilder(properties))
      lineBuilder.withFleet(FleetType.get(properties.getProperty("vehicleFleetType")))
      lineBuilder.withDriver(new CommercialDriverBuilder().withFirstName(properties.getProperty("driver2_firstName"))
          .withLastName(properties.getProperty("driver2_lastName"))
          .withBirthday(new Date(properties.getProperty("driver2_dob"))))

      var policyChange = new PolicyChangeBuilder().withBasedOnPeriod(policyperiod).withPolicyLine(lineBuilder)
                         .isDraft().create(bundle)
       policyChange.JobProcess.requestQuote()
      policyChange.JobProcess.bind()
    })
  }

  //Cancellation Job
  public function BACancellation(policyperiod: PolicyPeriod): PolicyPeriod {
    var cancellation: PolicyPeriod
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      policyperiod = bundle.add(policyperiod)
      cancellation = new CancellationBuilder().withBasedOnPeriod(policyperiod).create(bundle)
    })
    return cancellation
  }

  //Rewrite Job
  public function BARewrite(policyperiod: PolicyPeriod) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      policyperiod = bundle.add(policyperiod)
      new RewriteBuilder().withPolicyNumber(policyperiod.PolicyNumber).withBasedOnPeriod(policyperiod)
          .withEffectiveDate(java.util.Date.CurrentDate).withPeriodStart(java.util.Date.CurrentDate)
          .create(bundle)
    })
  }

  //BA Reinstatement Job
  public function BAReinstatement(policyperiod: PolicyPeriod) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      policyperiod = bundle.add(policyperiod)
      new ReinstatementBuilder().withPolicyNumber(policyperiod.PolicyNumber).withBasedOnPeriod(policyperiod)
          .withEffectiveDate(java.util.Date.CurrentDate)
          .create(bundle)
    })
  }

  //BA Renewal Job
  public function BARenewal(policyperiod: PolicyPeriod) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      policyperiod = bundle.add(policyperiod)
      new RenewalBuilder().withPolicyNumber(policyperiod.PolicyNumber).withBasedOnPeriod(policyperiod)
          .withEffectiveDate(policyperiod.PeriodEnd)
          .create(bundle)
    })
  }


  /* Method to create a policy
     * Transactions Incuded- Submission
    */
  function testCreateBAPolicy(properties: Properties) : PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    return policyPeriod
  }

  /* Method to create a reinstatement policy
   * Transactions Incuded- Submission and Policy Change
   */
  public function testBAPolicyChange(properties: Properties) : PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    policyPeriod.refresh()
    BAPolicyChange(policyPeriod)
    return policyPeriod
  }

  /* Method to create a policy cancellation
   * Transactions Incuded- Submission, Policy Change&  Cancellation
  */
  public function testBACancellation(properties: Properties) : PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    policyPeriod.refresh()
    BAPolicyChange(policyPeriod)
    policyPeriod.refresh()
    BACancellation(policyPeriod)
    return policyPeriod
  }

  /* Method to create a Rewrite policy
   * Transactions Incuded- Submission, Policy Change, Cancellation & Rewrite
  */
  public function testBARewrite(properties: Properties): PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    policyPeriod.refresh()
    BAPolicyChange(policyPeriod)
    policyPeriod.refresh()
    var cancellationPeriod = BACancellation(policyPeriod)
    policyPeriod.refresh()
    BARewrite(cancellationPeriod)
    return cancellationPeriod

  }

  /* Method to create a reinstatement policy
   * Transactions Incuded- Submission, Policy Change, Cancellation & Reinstatement
  */
  public function testBAReinstate(properties: Properties): PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    policyPeriod.refresh()
    BAPolicyChange(policyPeriod)
    policyPeriod.refresh()
    var cancellationPeriod = BACancellation(policyPeriod)
    policyPeriod.refresh()
    BAReinstatement(cancellationPeriod)
    return cancellationPeriod
  }

  /* Method to create a renewal policy
   * Transactions Incuded- Submission, Policy Change & Renewal
  */
  public function testBARenewal(properties: Properties): PolicyPeriod {
    var policyPeriod = createPolicyPeriod(properties)
    BASubmission(policyPeriod)
    policyPeriod.refresh()
    BAPolicyChange(policyPeriod)
    policyPeriod.refresh()
    BARenewal(policyPeriod)
    return policyPeriod
  }

}