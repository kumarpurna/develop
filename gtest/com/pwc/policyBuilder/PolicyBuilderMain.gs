package com.pwc.policyBuilder

uses com.pwc.jobProcesses.BA_JobProcessCreation
uses com.pwc.jobProcesses.GL_JobProcessCreation
uses com.pwc.jobProcesses.WC_JobProcessCreation

uses java.io.FileReader

class PolicyBuilderMain {
   
    public static enum POLICY_TYPE {
      BA({"ba"}),
      GL({"gl"}),
      WC({"wc"}),
      PA({"pa"}),
      private var parent: POLICY_TYPE
      private var propertyFilenames: List<String>

        private construct(_propertyFilenames: List<String>) {
        this(null, _propertyFilenames)
      }

      private construct(_parent: POLICY_TYPE, _propertyFilenames: List<String>) {
        parent = _parent
        propertyFilenames = new ArrayList<String>()
        if (parent != null)
          propertyFilenames.addAll(parent.propertyFilenames)
          propertyFilenames.addAll(_propertyFilenames)
      }

      property get Properties(): Properties {
        var properties = new Properties()
        propertyFilenames.each(\propertyFilename -> {

          var fr = new FileReader("modules/configuration/gtest/com/pwc/properties/${propertyFilename}.properties")
          properties.load(fr)
          fr.close()
        })
        return properties
      }
    }

  public static function getBAProperties() : Properties {
    return  POLICY_TYPE.BA.Properties
  }

  public static function createBAPolicy() : PolicyPeriod {  return new BA_JobProcessCreation().testCreateBAPolicy(POLICY_TYPE.BA.Properties) }
  public static function createGLPolicy() {  new GL_JobProcessCreation().testCreateGLPolicy(POLICY_TYPE.GL.Properties) }
  public static function createWCPolicy() {  new WC_JobProcessCreation().testCreateWcPolicy(POLICY_TYPE.WC.Properties) }


  public static function createBAPolicyChange() : PolicyPeriod {  return new BA_JobProcessCreation().testBAPolicyChange(POLICY_TYPE.BA.Properties) }
  public static function createBACancellation() : PolicyPeriod {  return new BA_JobProcessCreation().testBACancellation(POLICY_TYPE.BA.Properties) }
  public static function createBARewrite() : PolicyPeriod { return new BA_JobProcessCreation().testBARewrite(POLICY_TYPE.BA.Properties) }
  public static function createBAReinstatement() : PolicyPeriod { return new BA_JobProcessCreation().testBAReinstate(POLICY_TYPE.BA.Properties) }
  public static function createBARenewal() : PolicyPeriod { return new BA_JobProcessCreation().testBARenewal(POLICY_TYPE.BA.Properties) }
}


