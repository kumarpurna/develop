package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType

class TestActionDelegatingBase implements ITestActions {

  var _otherImplementation : ITestActions

  construct(otherImplementation : ITestActions) {
    _otherImplementation = otherImplementation
  }

  override function begin() {
    _otherImplementation.begin()
  }

  override function end() {
    _otherImplementation.end()
  }

  override function runTestsInClass(iType : IType) {
    _otherImplementation.runTestsInClass(iType)
  }

  override function runTestsInClass(iType : IType, testMethods : List<IMethodInfo>) {
    _otherImplementation.runTestsInClass(iType, testMethods)
  }

  override function runTestMethod(iType : IType, method : IMethodInfo, isFirstMethodInClass : boolean, isLastMethodInClass : boolean) {
    _otherImplementation.runTestMethod(iType, method, isFirstMethodInClass, isLastMethodInClass)
  }

  override function invokeTestMethod(method : IMethodInfo, testInstance : Object) {
    _otherImplementation.invokeTestMethod(method, testInstance)
  }

}
