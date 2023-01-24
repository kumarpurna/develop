package main

uses gw.api.system.server.Runlevel
uses gw.lang.reflect.ReflectUtil
uses gwservices.accelerator.testing.gunit.test.GUnitTestingLoggerCategory


/**
 * This is a convenience class for running the Jenkins <code>RemoteContinuousIntegrationRunnerTest</code> GUnit test from the "Gosu Scratchpad"
 * tab in Guidewire IntelliJ IDEA Studio.
 * <p>
 * You would run it with a line like this:
 * <code>main.MainTestAccelerator.runMainTestFromGosuScratchpad()</code>
 */
abstract class MainTestAccelerator {

  private construct() {
    throw "Do not create instances of this class. It exists only to hold static methods."
  }

  public static function runMainTestFromGosuScratchpad() {
    final var currentRunLevel = Runlevel.getCurrent()
    if (currentRunLevel.isEarlier(Runlevel.MULTIUSER)) {
      throw new AssertionError("Runlevel.MULTIUSER is required to run main.MainTest."
          // [Note:  <code>currentRunLevel.LocalizedName</code> throws NullPointerException when run at low run levels.
          + " Current Runlevel is Runlevel." + currentRunLevel.toString() + ".\n"
          //
          + "  To run main.MainTest from the Gosu Scratchpad in Studio, you must first run the application server in"
          + " DEBUG mode, and then you must use the 'Run in Debug Process' button on the Gosu Scratchpad window.\n")
    }

    final var startTime = System.currentTimeMillis()

    final var test = new RemoteContinuousIntegrationRunnerTest()

    ReflectUtil.invokeMethod(test, "beforeClass", {})

    ReflectUtil.invokeMethod(test, "beforeMethod", {})

    test.testAll()

    ReflectUtil.invokeMethod(test, "afterMethod", {null})

    try {
      ReflectUtil.invokeMethod(test, "afterClass", {})
    } catch (th: Throwable) {
      th.printStackTrace(System.err)
    }

    final var endTime = System.currentTimeMillis()
    final var duration = endTime - startTime

    var seconds = duration / 1000.0
    if (seconds > 60) {                            // If over a minute,
      seconds = Math.round(seconds)                //    Show only whole seconds.
    } else if (seconds > 10) {                     // If over 10 seconds (and under a minute),
      seconds = Math.round(seconds * 10) / 10.0    //    Show ONE digit to the right of the decimal -- like 10.3 or 59.2
    }                                              // Else...
    //                                             //    Milliseconds converted to seconds shows (up to) THREE digits to the right of the decimal.

    var minutes = seconds / 60.0                   // This division is prone to produce results with repeating decimal fractions, so...
    if (minutes > 5) {                             // If it took over five minutes to run,
      minutes = Math.round(minutes)                //    then don't show any fractional amount.  (Show 5 minutes, not 5.2 minutes.)
    } else if (minutes > 1) {                      // One to Five minutes...
      minutes = Math.round(minutes * 10) / 10.0    //    shows one decimal place.  Ex: 1.2 or 4.6
    } else {                                       // Less than a minute...
      minutes = Math.round(minutes * 100) / 100.0  //    show two decimal places.  Ex:  0.00, 0.03, 0.13, 0.94
    }

    final var logger = GUnitTestingLoggerCategory.GUNIT_MAIN_TEST
    logger.info("MainTest ran in " + seconds + " seconds = " + minutes + " minutes.")
  }
}