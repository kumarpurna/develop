package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType

class TimingTestActions extends TestActionDelegatingBase {

  var _showClassTiming: boolean as ShowClassTiming = true
  var _showMethodTiming: boolean as ShowMethodTiming = true

  construct(otherImplementation: ITestActions) {
    super(otherImplementation)
  }

  override function runTestsInClass(iType: IType, testMethods: List<IMethodInfo>) {
    var startTime = System.currentTimeMillis()
    super.runTestsInClass(iType, testMethods)
    if (ShowClassTiming) {
      var endTime = System.currentTimeMillis()
      var duration = endTime - startTime
      print(iType.Name + " " + duration)
    }
  }

  override function invokeTestMethod(method: IMethodInfo, testInstance: Object) {
    var startTime = System.currentTimeMillis()
    var outcome = "success"
    try {
      super.invokeTestMethod(method, testInstance)
    } catch (ex: Exception) {
      outcome = "exception"
    } finally {
      if (ShowMethodTiming) {
        var endTime = System.currentTimeMillis()
        var duration = endTime - startTime
        print(method.OwnersType.Name + " " + method.Name + " " + duration + " " + outcome)
      }
    }
  }

  override function end() {
    print("")
  }
}
