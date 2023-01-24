package com.pwc.common

uses gw.api.database.Query
uses gw.api.util.CurrencyUtil
uses gw.api.util.DateUtil
uses gw.pl.persistence.core.Bundle

uses java.io.FileReader


class GunitBuilderUtil_Ext {
  public static var properties : Properties
  public static var bundle : Bundle

  public static var userName : String
  public static var user : User
  public static var date : Date
  public static var currency : typekey.Currency

  // load properties file
  public static function loadProperties(prop : Properties, filePath : String) {
    var fileReader = new FileReader(filePath)
    prop.load(fileReader)
    properties = prop
    fileReader.close()
  }

  private static function findUserByUserName() : User {
    var qryUser = Query.make(entity.User).join("Credential").compare("UserName", Equals, userName).select()
    if(qryUser.HasElements) return qryUser.first()
    return Query.make(entity.User).select().first()
  }

  public static function init() {
    userName = properties.getProperty("username")
    user = findUserByUserName()
    date = DateUtil.currentDate()
    currency = CurrencyUtil.getDefaultCurrency()
  }

}