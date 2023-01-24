package com.pwc.common

uses gw.api.builder.AccountBuilder
uses gw.api.builder.OrganizationBuilder
uses gw.api.builder.ProducerCodeBuilder
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.pl.persistence.core.Bundle

class AccountSampleDataUtil {

  var locationUtil: LocationSampleDataUtil
  var properties : Properties
  construct(locUTil: LocationSampleDataUtil, prop : Properties){
    this.locationUtil = locUTil
    this.properties = prop
  }

  public function getAccount(accountNumber: String): Account{
    var account = Query.make(entity.Account).compare(Account#AccountNumber,Equals,accountNumber).select()
    if(account.Count > 0){
      return account.FirstResult
    }
    return null
  }

  public function createOrGetAccount(bundle: Bundle): Account {
    var account = getAccount(properties.getProperty("accountNumber"))
    var primaryLocation = locationUtil.createAccuntLocationBuilder(State.get(properties.getProperty("policyLocationState")))
    var org = createOrGetOrg()
    if (org == null){
      org = new OrganizationBuilder().withName(properties.getProperty("organizationName"))
            .withProducerStatus(ProducerStatus.get(properties.getProperty("producerState")))
            .withType(BusinessType.get(properties.getProperty("producerBusinessType"))).createAndCommit()
    }
    var producerCode = createOrGetProducerCode()
    if(producerCode == null){
      producerCode = new ProducerCodeBuilder().withCode(properties.getProperty("producerCode"))
          .withOrganization(org)
          .withStatus(ProducerStatus.get(properties.getProperty("producerState")))

          .createAndCommit()
    }

    if(account == null){
       account = new AccountBuilder()
          .withAccountNumber(properties.getProperty("accountNumber"))
           .withPrimaryLocation(primaryLocation)
           .withProducerCode(producerCode)
           .create(bundle)
    }
    return account
  }

  public function createOrGetOrg(): Organization{
    var org = Query.make(entity.Organization).compare(Organization#Name, Relop.Equals,properties.getProperty("organizationName")).select()
    if(org.Count > 0){
      return org.FirstResult
    }
    return null
  }

  public function createOrGetProducerCode(): ProducerCode{
    var org = Query.make(entity.ProducerCode).compare(ProducerCode#Code, Relop.Equals,properties.getProperty("producerCode")).select()
    if(org.Count > 0){
      return org.FirstResult
    }
    return null
  }


}