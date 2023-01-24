package com.pwc.common

uses gw.api.util.ConfigAccess
uses java.lang.*
uses java.io.IOException

class GWLoadConfigPath {

  public static function getConfigurationParentFolder(): String {
    return loadConfigurationFolder()
  }

  private static function loadConfigurationFolder(): String {
    try {
      var path = ConfigAccess.getModuleRoot("configuration").getPath()
      return path
    } catch (ex: IOException) {
      return ex.Message
    }
  }
}