package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType

interface ITestReporter {

  property get PassingTests() : int
  property get FailingTests() : int
  property get TestClassesSkippedDueToRunlevel() : int
  property get TotalTests() : int

  function begin()

  function end()

  function beginClass()

  function endClass(iType: IType)

  function beginMethod()

  function endMethod()

  function printFailLine()

  function skipClassDueToRunlevel(iType: IType)

  function classHasNoTestMethods(iType: IType)

  function classFailed(iType: IType, ex: Throwable)

  function testMethodPassed(method: IMethodInfo)

  function testMethodFailed(method: IMethodInfo, ex: Throwable)

}
