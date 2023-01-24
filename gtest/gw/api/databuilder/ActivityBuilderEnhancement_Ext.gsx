package gw.api.databuilder

uses gw.api.builder.ActivityBuilder
uses gw.api.databuilder.*

enhancement ActivityBuilderEnhancement_Ext : ActivityBuilder {

	function withTextString_Ext(textString_Ext : java.lang.String) : ActivityBuilder {
		this.set(entity.Activity.Type.TypeInfo.getProperty("TextString_Ext"), textString_Ext)
		return this
	}

}
