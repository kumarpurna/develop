package gwservices.accelerator.testing.gunit

class TestFuntions {

  var _testType: TestType

  construct(testType: TestType){
   _testType = testType
  }

  public function beforeMethod():String  {
    return _testType == TestType.V2 ? "beforeMethod" : "beforeTestMethod"
  }

  public function afterMethod():String  {
    return _testType == TestType.V2 ? "afterMethod" : "afterTestMethod"
  }

  public function beforeClass():String  {
    return _testType == TestType.V2 ? "beforeClass" : "beforeTestClass"
  }

  public function afterClass():String  {
    return _testType == TestType.V2 ? "afterClass" : "afterTestClass"
  }
}