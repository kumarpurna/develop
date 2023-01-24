package gwservices.accelerator.testing.gunit.test

uses gw.api.system.server.Runlevel
uses gw.testharness.*

uses java.util.Collections

uses org.apache.log4j.Level

@ServerTest
@RunLevel(Runlevel.NONE)
class MockSlf4jLoggerTest extends TestBase {

  var _logger: MockSlf4jLogger = null  // = new MockSlf4jLogger()

  override function beforeMethod() {
    super.beforeMethod()
    _logger = new MockSlf4jLogger()
  }

  /**
   * Test that messages of <code>Level.INFO</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelINFO() {
    assertSame("Default logging Level;", Level.INFO, _logger.CurrentLogLevel)

    _logger.info("Info Level Message")
    assertEquals("at Level.INFO;", toLists({{Level.INFO, "Info Level Message"}}), _logger.EventsAsListOfLists)

    _logger = new MockSlf4jLogger()

    _logger.warn("Warn Level Message")
    assertEquals("WARN > INFO;", toLists({{Level.WARN, "Warn Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.error("Error Level Message")
    assertEquals("ERROR > INFO;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.debug("Debug Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.DEBUG)

    _logger.clearEventsList()

    _logger.trace("Trace Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * Test that messages of <code>Level.WARN</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelWARN() {
    _logger.CurrentLogLevel = Level.WARN

    _logger.warn("Warn Level Message")
    assertEquals("at Level.WARN;", toLists({{Level.WARN, "Warn Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.error("Error Level Message")
    assertEquals("ERROR > WARN;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.info("Info Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.INFO)

    _logger.clearEventsList()

    _logger.debug("Debug Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.DEBUG)

    _logger.clearEventsList()

    _logger.trace("Trace Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * Test that messages of <code>Level.ERROR</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelERROR() {
    _logger.CurrentLogLevel = Level.ERROR

    _logger.error("Error Level Message")
    assertEquals("at Level.ERROR;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.warn("Warn Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.WARN)

    _logger.clearEventsList()

    _logger.info("Info Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.INFO)

    _logger.clearEventsList()

    _logger.debug("Debug Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.DEBUG)

    _logger.clearEventsList()

    _logger.trace("Trace Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * Test that messages of <code>Level.DEBUG</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelDEBUG() {
    _logger.CurrentLogLevel = Level.DEBUG

    _logger.debug("Debug Level Message")
    assertEquals("at Level.DEBUG;", toLists({{Level.DEBUG, "Debug Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.info("Info Level Message")
    assertEquals("INFO > DEBUG;", toLists({{Level.INFO, "Info Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.warn("Warn Level Message")
    assertEquals("WARN > DEBUG;", toLists({{Level.WARN, "Warn Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.error("Error Level Message")
    assertEquals("ERROR > DEBUG;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.trace("Trace Level Message")
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * Test that messages of <code>Level.TRACE</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelTRACE() {
    _logger.CurrentLogLevel = Level.TRACE

    _logger.trace("Trace Level Message")
    assertEquals("at Level.TRACE;", toLists({{Level.TRACE, "Trace Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.debug("Debug Level Message")
    assertEquals("DEBUG > TRACE;", toLists({{Level.DEBUG, "Debug Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.info("Info Level Message")
    assertEquals("INFO > TRACE;", toLists({{Level.INFO, "Info Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.warn("Warn Level Message")
    assertEquals("WARN > TRACE;", toLists({{Level.WARN, "Warn Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.error("Error Level Message")
    assertEquals("ERROR > TRACE;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)
  }

  /**
   * When setting the Logger to record only <code>Level.FATAL</code> and higher, we get <b>nothing</b>, as the SLF4J
   * interface does not include any <code>fatal</code> level methods.
   */
  function testLevelFATAL() {
    _logger.CurrentLogLevel = Level.FATAL

    _logger.error("Error Level Message")
    _logger.warn("Warn Level Message")
    _logger.info("Info Level Message")
    _logger.debug("Debug Level Message")
    _logger.trace("Trace Level Message")

    assertNoEventMessagesAtCurrentLogLevel(Level.ERROR)
    assertNoEventMessagesAtCurrentLogLevel(Level.WARN)
    assertNoEventMessagesAtCurrentLogLevel(Level.INFO)
    assertNoEventMessagesAtCurrentLogLevel(Level.DEBUG)
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * When setting the Logger to record only <code>Level.OFF</code>, we get no events logged, by design.
   */
  function testLevelOFF() {
    _logger.CurrentLogLevel = Level.OFF

    _logger.error("Error Level Message")
    _logger.warn("Warn Level Message")
    _logger.info("Info Level Message")
    _logger.debug("Debug Level Message")
    _logger.trace("Trace Level Message")

    assertNoEventMessagesAtCurrentLogLevel(Level.ERROR)
    assertNoEventMessagesAtCurrentLogLevel(Level.WARN)
    assertNoEventMessagesAtCurrentLogLevel(Level.INFO)
    assertNoEventMessagesAtCurrentLogLevel(Level.DEBUG)
    assertNoEventMessagesAtCurrentLogLevel(Level.TRACE)
  }

  /**
   * When the Logger is ??? <code>Level.ALL</code> and higher get "logged" (to the internal ArrayList store)
   */
  function testLevelALL() {
    _logger.CurrentLogLevel = Level.ALL

    _logger.trace("Trace Level Message")
    assertEquals("TRACE > ALL;", toLists({{Level.TRACE, "Trace Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.debug("Debug Level Message")
    assertEquals("DEBUG > ALL;", toLists({{Level.DEBUG, "Debug Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.info("Info Level Message")
    assertEquals("INFO > ALL;", toLists({{Level.INFO, "Info Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.warn("Warn Level Message")
    assertEquals("WARN > ALL;", toLists({{Level.WARN, "Warn Level Message"}}), _logger.EventsAsListOfLists)

    _logger.clearEventsList()

    _logger.error("Error Level Message")
    assertEquals("ERROR > ALL;", toLists({{Level.ERROR, "Error Level Message"}}), _logger.EventsAsListOfLists)
  }

  private function assertNoEventMessagesAtCurrentLogLevel(final logLevelOfTestLogEvents: Level) {
    assertEquals("Expecting NO logging of Level." + logLevelOfTestLogEvents.toString() + " messages;",
        Collections.EMPTY_LIST, _logger.EventsAsListOfLists)
  }

  private static function toLists(final inputArrays: Object[][]): List<List<Object>> {
    return inputArrays.map(\event -> event.toList()).toList()
  }

}