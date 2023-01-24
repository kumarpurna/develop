package com.pwc.EntityBuilder

uses com.pwc.common.GunitBuilderConstant
uses com.pwc.common.GunitBuilderUtil_Ext
uses gw.api.system.PCLoggerCategory

uses java.io.FileNotFoundException

class EntityBuilderMain {

  //Generate Entity Builders
  public static function generateEntityBuilders() {
    var prop : Properties
    var propertyFilename = "builder_generator"
    var filePath = GunitBuilderConstant.PATH_BUILDER_PROP + "${propertyFilename}" + GunitBuilderConstant.EXTN_PROP
    try {
      prop = new Properties()
      GunitBuilderUtil_Ext.loadProperties(prop, filePath) // load the property
      BuilderGeneratorUtil.go()
    } catch(fne : FileNotFoundException) {
      PCLoggerCategory.TEST.error(fne.getMessage())
    } catch(e : Exception) {
      PCLoggerCategory.TEST.error(e.StackTraceAsString)
    } finally {
      if(prop != null) prop.clear()
    }

  }
}