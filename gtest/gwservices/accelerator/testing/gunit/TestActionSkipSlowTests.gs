package gwservices.accelerator.testing.gunit

uses gw.lang.reflect.IType

class TestActionSkipSlowTests extends TestActionDelegatingBase {

  var _numberOfSlowTestsSkipped = 0

  construct(otherImplementation: ITestActions) {
    super(otherImplementation)
  }

  override function runTestsInClass(iType: IType) {
    var hasSlowTestAnnotation = (iType.TypeInfo.getAnnotation(SlowTest) != null)
    var implementsISlowTestInterface = iType.Interfaces.contains(ISlowTest)
    if (hasSlowTestAnnotation or implementsISlowTestInterface) {
      // Skip "Slow" Tests.
      _numberOfSlowTestsSkipped++
      print(iType.Name + " - SlowTest skipped.")
    } else {
      // Run all other tests.
      super.runTestsInClass(iType)
    }
  }

  override function end() {
    super.end()
    print("Number of '@SlowTest' classes skipped: " + _numberOfSlowTestsSkipped)
  }

}
