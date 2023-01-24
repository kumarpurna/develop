package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType

interface ITestActions {

  function begin()

  function end()

  function runTestsInClass(iType: IType)

  function runTestsInClass(iType: IType, testMethods: List<IMethodInfo>)

  /**
   * Executes the test*** methods of a Class
   */
  function runTestMethod(iType: IType, method: IMethodInfo, isFirstMethodInClass: boolean, isLastMethodInClass: boolean)

  function invokeTestMethod(method: IMethodInfo, testInstance: Object)

}
