package gwservices.accelerator.testing.gunit

uses gw.api.test.TestClass
uses gw.lang.reflect.IType
//uses gw.test.TestClass
uses gw.testharness.TestBase

enum TestType {
  V2, V3, NOT_TEST

  public static function getType(iType: IType): TestType {
    if(iType.AllTypesInHierarchy.contains(TestBase)){
      return V2
    } else if(iType.AllTypesInHierarchy.contains(TestClass)) {
      return V3
    } else {
      return NOT_TEST
    }
  }
}