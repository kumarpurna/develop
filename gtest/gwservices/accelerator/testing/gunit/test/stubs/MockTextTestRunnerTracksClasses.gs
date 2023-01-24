package gwservices.accelerator.testing.gunit.test.stubs

uses gw.lang.reflect.IType
uses gwservices.accelerator.testing.gunit.TextTestRunner

class MockTextTestRunnerTracksClasses extends TextTestRunner {

  var _testClassesRun : Set<IType> as TestClassesRun = new TreeSet<IType>()

  property get NamesOfAllTestClassRun() : Set<String> {
    var names = new TreeSet<String>()
    TestClassesRun.each(\ clazz -> names.add(clazz.Name))
    return names
  }

  override function runTestsInClass(clazz : IType) {
    TestClassesRun.add(clazz)
  }

}
