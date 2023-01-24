package gwservices.accelerator.testing.gunit

uses gw.api.system.server.Runlevel
uses gw.api.test.TestClass
uses gw.api.util.ConfigAccess
uses gw.lang.parser.exceptions.ErrantGosuClassException
uses gw.lang.reflect.IMethodInfo
uses gw.lang.reflect.IType
uses gw.lang.reflect.ReflectUtil
uses gw.lang.reflect.TypeSystem
uses gw.pl.util.FileUtil
uses gw.test.IForwardingTestEnvironment
//uses gw.test.TestClass
uses gw.test.TestEnvironment
uses gw.testharness.RunLevel
uses gw.testharness.TestBase
uses gw.testharness.v3.PLServerTestEnvironment
uses gwservices.accelerator.testing.gunit.test.GUnitTestingLoggerCategory

uses java.io.File

class TextTestRunner implements ITestActions {

  var _runlevelAccessor: IRunlevelAccessor
  var _testReporter: ITestReporter as TestReporter
  var _testActions: ITestActions as TestActions
  var _logger = GUnitTestingLoggerCategory.GUNIT_MAIN_TEST
  var _gtestDirectoryAbsolutePathPrefix : String = null

  construct() {
    this(new RunlevelWrapper())
  }

  construct(runlevelAccessor: IRunlevelAccessor) {
    this(runlevelAccessor, new TextTestReporter(runlevelAccessor))
  }

  construct(runlevelAccessor: IRunlevelAccessor, testReporterIn: ITestReporter) {
    _testActions = this
    _runlevelAccessor = runlevelAccessor
    _testReporter = testReporterIn
  }

  function initalize() {
    _testReporter.begin()
    _testActions.begin()
  }

  override function begin() {
  }

  function finish() {
    _testActions.end()
    _testReporter.end()
  }

  override function end() {
  }

  function runAllTests() {
    runTestsInPackage("")
  }

  function runTestsInPackage(final packageName: String) {
    final var configurationDirectory = ConfigAccess.getModuleRoot("configuration").AbsolutePath
    _gtestDirectoryAbsolutePathPrefix = configurationDirectory + File.separatorChar + "gtest"
    final var fileName = _gtestDirectoryAbsolutePathPrefix + File.separatorChar + packageName.replaceAll("\\.", "/")
    FileUtil.eachFileInTree(new File(fileName), \ testClassFile : File -> {
      if (!testClassFile.Name.endsWith("Test.gs")){
        return
      }
      final var testClassFullyQualifiedClassName = TestFileUtil.extractFullyQualifiedClassName(testClassFile)
      _logger.info("START TEST : " + testClassFullyQualifiedClassName)
      var testClassType : IType = null
      try {
        testClassType = TypeSystem.getByFullName(testClassFullyQualifiedClassName)
      } catch (classLoadException : Exception) {
        _logger.error("Cannot get an intrinsic type based on a fully-qualified name " + testClassFullyQualifiedClassName,
            classLoadException)
        return  // If we can't load it, we assume that it is NOT a GUnit test class. (But may be a RunLevel issue.)
      }
      if (testClassType.Abstract || testClassType == main.RemoteContinuousIntegrationRunnerTest.Type) {
        return
      }
      TestBase.assertEquals(testClassFullyQualifiedClassName, testClassType.Name)
      runTestsInClassFile(testClassType)
    })
  }

  /**
   * Run all the GUnit test methods that are in the given GUnit test class.
   */
  private function runTestsInClassFile(final testClassType : IType) {
    final var currentRunlevel = _runlevelAccessor.CurrentServerRunlevel
    final var requiredRunlevel = getRequiredRunLevel(testClassType)
    if (TestType.getType(testClassType) == TestType.V2) {
      _testReporter.beginClass()
      if (currentRunlevel.ordinal() >= requiredRunlevel.ordinal()) {
        _testActions.runTestsInClass(testClassType)
      } else {
        _testReporter.skipClassDueToRunlevel(testClassType)
      }
      _testReporter.endClass(testClassType)
    } else if (TestType.getType(testClassType) == TestType.V3) {
      runMethodsinV3TestClass(testClassType, currentRunlevel)
    }
  }

  private function runMethodsinV3TestClass(iType: IType, currentRunlevel: Runlevel) {
    _testReporter.beginClass()
    final var defaultConstructor = iType.TypeInfo.getCallableConstructor({})
    var testInstance: TestClass
    var defaultEnvironment: TestEnvironment
    try{
      testInstance = defaultConstructor.Constructor.newInstance(null) as TestClass
      defaultEnvironment = testInstance.createDefaultEnvironment()
    } catch (ex: Throwable) {
      _testReporter.classFailed(iType, ex)
    }
    final var testIsUnitTest = defaultEnvironment != null &&
        !(defaultEnvironment typeis IForwardingTestEnvironment || defaultEnvironment typeis PLServerTestEnvironment)
    if (currentRunlevel == Runlevel.MULTIUSER || testIsUnitTest) {
      _testActions.runTestsInClass(iType)
    } else {
      _testReporter.skipClassDueToRunlevel(iType)
    }
    _testReporter.endClass(iType)
  }

  private static function getRequiredRunLevel(final iType : IType) : Runlevel {
    final var runLevelAnnotation = iType.TypeInfo.getAnnotation(RunLevel)

    if (runLevelAnnotation != null) {
      var genericInstance : Object = null
      try {
        genericInstance = runLevelAnnotation.Instance
      } catch (ex : ErrantGosuClassException) {
        /*
         * If we can't parse the class, then let's make a "worst case" assumption about the required @RunLevel it may
         * have (if it were loadable ;-)
         */
        return Runlevel.MULTIUSER   // "Worst case" assumption on failure.
      }

      if (genericInstance != null) {
        final var runLevelInstance = genericInstance as RunLevel
        if (runLevelInstance.value() != null) {
          return runLevelInstance.value()   // @RunLevel annotation is present; return its value.
        }
      }
    }

    return Runlevel.MULTIUSER   // Standard Guidewire OOTB default to use when @RunLevel annotation is absent.
  }

  override function runTestsInClass(iType: IType) {
    final var testMethods = iType.TypeInfo.Methods.where(\method -> (
        method.DisplayName.startsWith("test")
            and method.Parameters.IsEmpty
            and method.ReturnType === void.Type
    ))
    if (testMethods.Empty) {  // Not having any test methods is an error.
      _testReporter.classHasNoTestMethods(iType)
    } else {
      _testReporter.beginMethod()
      _testActions.runTestsInClass(iType, testMethods)
      _testReporter.endMethod()
    }
  }

  override function runTestsInClass(iType: IType, testMethods: List<IMethodInfo>) {
    testMethods?.each(\method -> {
      final var isFirstMethodInClass = (method == testMethods.first())
      final var isLastMethodInClass = (method == testMethods.last())
      _testActions.runTestMethod(iType, method, isFirstMethodInClass, isLastMethodInClass)
    })
  }

  public function runTestMethod(method: IMethodInfo) {
    var iType = method.OwnersType
    runTestMethod(iType, method, true, true)
  }

  override function runTestMethod(final iType: IType, final method: IMethodInfo,
                                  final isFirstMethodInClass: boolean, final isLastMethodInClass: boolean) {
    final var testFuntions = new TestFuntions(TestType.getType(iType))
    _logger.info("Executing test method " + method.DisplayName)
    try {
      final var defaultConstructor = iType.TypeInfo.getConstructor(null)
      final var testInstance = defaultConstructor.Constructor.newInstance(null)
      if (isFirstMethodInClass) {
        try {
          invokeReflectionTestMethod(testInstance, testFuntions.beforeClass())
        } catch (ex: Throwable) {
          print("Caught exception from 'beforeClass' call.")
          print("  Owner:  " + method.OwnersType)
          print("  Method: " + method)
          print("\n")
          print("Exception:\n" + ex + "\n\n\n")
          throw ex  //TODO test for exception
        }
      }
      invokeReflectionTestMethod(testInstance, testFuntions.beforeMethod())
      var testException: Throwable = null
      var afterMethodWasCalled = false
      try {
        try {
          _testActions.invokeTestMethod(method, testInstance)
          afterMethodWasCalled = true
          invokeReflectionTestMethod(testInstance, testFuntions.afterMethod(), {null})
        } catch (ex: Throwable) {
          testException = ex
          if (not afterMethodWasCalled) {
            invokeReflectionTestMethod(testInstance, testFuntions.afterMethod(), {ex})
          }
        }
      } finally {
        if (isLastMethodInClass) {
          invokeReflectionTestMethod(testInstance, testFuntions.afterClass())
        }
      }
      if (testException != null) {
        throw testException
      }
      _testReporter.testMethodPassed(method)
    } catch (ex: Throwable) {
      _testReporter.testMethodFailed(method, ex)
    }
  }

  override function invokeTestMethod(final method: IMethodInfo, final testInstance: Object) {
    invokeReflectionTestMethod(testInstance, method.DisplayName)
  }

  private function invokeReflectionTestMethod(final testInstance: Object, final method: String) {
    invokeReflectionTestMethod(testInstance, method, {})
  }

  private function invokeReflectionTestMethod(final testInstance: Object, final method: String,
                                              final obj: Object[]) {
    if (testInstance typeis TestBase || testInstance typeis TestClass) {
      ReflectUtil.invokeMethod(testInstance, method, obj)
    } else {
      throw new IllegalStateException("not a test class")
    }
  }

}
