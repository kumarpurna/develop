package com.pwc.EntityBuilder

uses com.pwc.common.GWCreateFolder
uses com.pwc.common.GWLoadConfigPath
uses com.pwc.common.GunitBuilderUtil_Ext
uses gw.api.system.PCLoggerCategory
uses gw.lang.reflect.IPropertyInfo
uses gw.lang.reflect.IType

uses java.io.File
uses java.io.FileWriter

@SuppressWarnings("deprecation")

class BuilderGeneratorUtil {
  // magic list of non persistent entities (no builder OOTB) 

  static var magic = {"Contact.Global","ContactSearchCriteria","Coverage","NameCriteria",
      "ContactSearchResult","DocumentSearchCriteria",
      "DocumentSearchResult","DocumentTemplateSearchCriteria","DocumentTemplateSearchResults",
      "UserSearchCriteria","ContactSearchCriteria.Global","GlobalAddress.Global",
      "GlobalContactName.Global","GlobalPersonName.Global","Group.Global","GroupSearchCriteria.Global",
      "NameCriteria.Global","Organization.Global","OrganizationSearchCriteria.Global","UserSearchCriteria.Global"
  }

  // The server must be running for this call to work
  static var _loader = gw.lang.reflect.TypeSystem.TypeLoader
  static var _customTags  : java.util.ArrayList<String>
  static var _packageName : String


  private construct() {}

  /**
   * Determine whether or not this thing is a customer extension
   */

  static function isCustomerExtension(string : String,_newTags:ArrayList<String>) : boolean{
    var retval = false
    for (customTag in _newTags){
      if(string.toLowerCase().contains(customTag.toLowerCase())){
        retval = true
      }
    }
    return retval
  }

  /**
   * Remove the extension tag from the argument string
   */
  static function removeExtensionTag(string : String, _newTags:ArrayList<String>) : String{
    var outstring = string
    for (customTag in _newTags){
      if (!(customTag == "_Ext"))
        outstring = outstring.remove(customTag)
    }
    return outstring
  }

  /**
   * Generate code for databuilders
   * Look into the extensions folder and generate databuilder code. This will
   * generate subclasses to DataBuilder for all new entities in the customer
   * config, and enhancements to the existing databuilders for extensions found
   * on OOTB classes.
   */
  static function go(){
    PCLoggerCategory.TEST.info("BuilderGeneratorUtil started")
    _packageName  = GunitBuilderUtil_Ext.properties.getProperty("Package_Name")
    _customTags = {GunitBuilderUtil_Ext.properties.getProperty("Customer_Extension")}
    var builderCount = 0
    var extPath = GWLoadConfigPath.getConfigurationParentFolder() + "/config/extensions/entity" .replaceAll("\\.", "/")
    var folder = new File(extPath);
    var listOfFiles = folder.listFiles();
    var fileNames = new ArrayList<String>()
    for (i in listOfFiles) {
      if (i.isFile()) {
        fileNames.add(i.getName().replaceFirst("[.][^.]+$", ""))
      }
    }
    // check / clear output directory
    var packagePathName = GWLoadConfigPath.getConfigurationParentFolder() + "/gtest/" + _packageName.replaceAll("\\.", "/")
    GWCreateFolder.createOneorMoreDirectories(packagePathName)
    var packagePath = new File(packagePathName)
    try {
      packagePath.eachChild( \ f -> (f.File and !f.Name.containsIgnoreCase(".svn")) ? f.delete() : null)
    } catch ( ex : Exception) {
      // NPE due to there being no Children...
    }
    // look at the type system and find extension properties
    fileNames.removeAll(magic)
    for(en in fileNames) {
      var typeName = gw.lang.reflect.TypeSystem.getByFullName("entity." + en).getName()

      var type = _loader.getType(typeName)
      var properties = type.TypeInfo.Properties.toTypedArray().toList()
      /**
       * If this type is a subtype of another entity, look for the parents
       * and remove the properties defined on the parents from the list.
       */
      // only specific builders that extend other builders - avoids enhancement builders trying to override functions
      if (type.AllTypesInHierarchy.hasMatch(\t -> t == entity.Contact || t == entity.Transaction)) {
        var parentType = type.Supertype
        while (parentType != null) {
          properties.removeAll(parentType.TypeInfo.Properties)
          parentType = parentType.Supertype
        }
      }
      // remove properties which are not writable
      properties.retainWhere(\i -> i.Writable)
      /**
       * If the type is an extension, retain all properties. If the type is not
       * an extension, retain only those properties which are extensions.
       */
      if (!isCustomerExtension(typeName,_customTags)) {
        properties.retainWhere(\i -> isCustomerExtension(i.Name,_customTags))
      }
      // build the output file
      if (properties.HasElements) {
        // generate the file name
        var fileName = packagePath + "\\"
        if (isCustomerExtension(typeName,_customTags)) {
          fileName += typeName.remove("entity.")
          fileName += "Builder.gs"
        } else {
          fileName += typeName.remove("entity.")
          fileName += "BuilderEnhancement_Ext.gsx"
        }
        var fileWriter = new FileWriter(fileName)
        try {
          generateTemplate(fileWriter, type, properties,_customTags)
          fileWriter.close()
          builderCount++
        } catch (e: ClassNotFoundException) {
          fileWriter.close()
          new File(fileName).delete()
        }
      }
    }
    PCLoggerCategory.TEST.info("BuilderGeneratorUtil finished - ${builderCount} builders created")
  }

  /**
   * Builder function names follow a with / as / on convention for the function
   * prefixes.  Attempt to calculate and return the correct prefix.
   */
  static function getFunctionPrefix(type : IType) : String{
    var retval = "with"
    if(type.Name.toLowerCase().contains("boolean")){
      retval = "as"
    }
    else if (type.Name.toLowerCase().startsWith("entity.") && !type.Array){
      retval = "on"
    }
    return retval
  }

  static function getFunctionPrefix(prop : IPropertyInfo) : String{
    var retval = "with"
    if(prop.Type.Name.toLowerCase().contains("boolean")){
      retval = "as"
    }
    else if (prop.Type.Name.toLowerCase().startsWith("entity.") && !prop.Type.Array)
    {
      var owner = prop.OwnersType
      var propOwner = prop.Type.TypeInfo.OwnersType
      var propOwnerProps = propOwner.TypeInfo.Properties
      if (!propOwnerProps.hasMatch( \ p -> owner == p.FeatureType && (typeof p).equals("com.guidewire.commons.entity.type2.OneToOnePropertyInfo_Proxy")))
        retval = "on"
    }
    return retval
  }

  static private function generateTemplate(fw : FileWriter, type : IType, props : List<IPropertyInfo>,_newTags:java.util.ArrayList<String>)
  {
    var sb = new StringBuilder()
    var typeName = type.Name
    var typeNameNoEntity = type.Name.remove("entity.")
    sb.append("package ${_packageName}\n\n")
    sb.append("uses gw.api.databuilder.*\n\n")
    if(isCustomerExtension(typeName,_newTags)) //or !TypeNames.contains(typeName))
    {
      sb.append("class ${typeNameNoEntity}Builder extends DataBuilder<${typeNameNoEntity}, ${typeNameNoEntity}Builder> {\n\n")
      sb.append("construct() {\n")
      sb.append("super(${typeName})\n")
      sb.append("}\n\n")
    }
    else
    {
      // Throws ClassNotFoundException if Guidewire does not provide a Builder for the enhanced class
      //BuilderGeneratorUtil.Type.BackingClass.ClassLoader.loadClass("gw.api.databuilder.${typeNameNoEntity}Builder")
      sb.append("enhancement ${typeNameNoEntity}BuilderEnhancement_Ext : ${typeNameNoEntity}Builder {\n\n")
    }
    for(prop in props)
    {
      if(prop.Name.contains("PublicID"))
      {
        // do not create functions to build PublicID, already defined in DataBuilder
        continue
      }
      var theProp = prop
      sb.append(renderToString(type, theProp,_newTags))
    }
    sb.append("}\n")
    fw.write(sb.toString())
  }

  static private function renderToString(type : IType, prop : IPropertyInfo,_newTags:java.util.ArrayList<String>) : String
  {
    var sb = new StringBuilder()
    var typeName = type.Name
    var typeNameNoEntity = type.Name.remove("entity.")
    var propName = prop.Name
    var propTypeName = prop.Type.Name
    var varName = removeExtensionTag(propName.uncapitalize(),_newTags)
    if (varName == "property") // reserved keyword
      varName = "_property"
    sb.append("\tfunction ${getFunctionPrefix(prop)}${propName.capitalize()}(${varName} : ${propTypeName}) : ${typeNameNoEntity}Builder {\n")
    sb.append("\t\t${isCustomerExtension(typeName,_newTags) ? "" : "this."}set(${typeName}.Type.TypeInfo.getProperty(\"${propName}\"), ${varName})\n")
    sb.append("\t\treturn this\n")
    sb.append("\t}\n\n")
    return sb.toString()
  }

}