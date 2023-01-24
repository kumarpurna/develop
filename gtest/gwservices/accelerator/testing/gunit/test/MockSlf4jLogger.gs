package gwservices.accelerator.testing.gunit.test

uses org.apache.log4j.Level
uses org.slf4j.Logger
uses org.slf4j.Marker

class MockSlf4jLogger implements Logger {

  static final var MUST_IMPLEMENT_THIS_METHOD = "Sorry; please implement this method in this mock logger class."
      + " Implement log level check. Run and update GUnit tests, as appropriate."

  var _currentLogLevel: Level as CurrentLogLevel = Level.INFO
  var _events: List<Object[]>as readonly Events = new ArrayList<Object[]>()

  /**
   * @return <code>Events</code> property data, returned as a <code>List</code> of <code>List</code> instances,
   * each of which represents one logging event, and contains the data describing the event.
   */
  property get EventsAsListOfLists(): List<List<Object>> {
    return Events.map(\event -> event.toList())
  }

  override property get Name(): String {
    return "MockSlf4jLogger"
  }

  /**
   * Clear the <code>Events</code> list of all data.
   */
  function clearEventsList() {
    Events.clear()
  }

  override property get TraceEnabled(): boolean {
    return (CurrentLogLevel.toInt() <= Level.TRACE_INT)
  }

  override function trace(final message: String) {
    if (TraceEnabled) {
      _events.add({Level.TRACE, message})
    }
  }

  override function trace(p0: String, p1: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: String, p1: Object, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }
  override function trace(p0: String, p1: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: String, p1: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function isTraceEnabled(p0: Marker): boolean {
    return (CurrentLogLevel.toInt() <= Level.TRACE_INT)
  }

  override function trace(p0: Marker, p1: String) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: Marker, p1: String, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: Marker, p1: String, p2: Object, p3: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: Marker, p1: String, p2: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function trace(p0: Marker, p1: String, p2: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override property get DebugEnabled(): boolean {
    return (CurrentLogLevel.toInt() <= Level.DEBUG_INT)
  }

  override function debug(final message: String) {
    if (DebugEnabled) {
      _events.add({Level.DEBUG, message})
    }
  }

  override function debug(p0: String, p1: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: String, p1: Object, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: String, p1: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: String, p1: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function isDebugEnabled(p0: Marker): boolean {
    return (CurrentLogLevel.toInt() <= Level.DEBUG_INT)
  }

  override function debug(p0: Marker, p1: String) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: Marker, p1: String, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: Marker, p1: String, p2: Object, p3: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: Marker, p1: String, p2: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function debug(p0: Marker, p1: String, p2: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override property get InfoEnabled(): boolean {
    return (CurrentLogLevel.toInt() <= Level.INFO_INT)
  }

  override function info(final message: String) {
    if (InfoEnabled) {
      _events.add({Level.INFO, message})
    }
  }

  override function info(p0: String, p1: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: String, p1: Object, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: String, p1: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: String, p1: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function isInfoEnabled(p0: Marker): boolean {
    return (CurrentLogLevel.toInt() <= Level.INFO_INT)
  }

  override function info(p0: Marker, p1: String) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: Marker, p1: String, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: Marker, p1: String, p2: Object, p3: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: Marker, p1: String, p2: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function info(p0: Marker, p1: String, p2: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override property get WarnEnabled(): boolean {
    return (CurrentLogLevel.toInt() <= Level.WARN_INT)
  }

  override function warn(final message: String) {
    if (WarnEnabled) {
      _events.add({Level.WARN, message})
    }
  }

  override function warn(p0: String, p1: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: String, p1: Object, p2: Object) {

  }
  override function warn(p0: String, p1: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: String, p1: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function isWarnEnabled(p0: Marker): boolean {
    return (CurrentLogLevel.toInt() <= Level.WARN_INT)
  }

  override function warn(p0: Marker, p1: String) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: Marker, p1: String, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: Marker, p1: String, p2: Object, p3: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: Marker, p1: String, p2: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function warn(p0: Marker, p1: String, p2: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override property get ErrorEnabled(): boolean {
    return (CurrentLogLevel.toInt() <= Level.ERROR_INT)
  }

  override function error(final message: String) {
    if (ErrorEnabled) {
      _events.add({Level.ERROR, message})
    }
  }

  override function error(p0: String, p1: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: String, p1: Object, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: String, p1: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(final message: String, final throwable: Throwable) {
    if (ErrorEnabled) {
      _events.add({Level.ERROR, message, throwable})
    }
  }

  override function isErrorEnabled(p0: Marker): boolean {
    return (CurrentLogLevel.toInt() <= Level.ERROR_INT)
  }

  override function error(p0: Marker, p1: String) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: Marker, p1: String, p2: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: Marker, p1: String, p2: Object[]) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: Marker, p1: String, p2: Object, p3: Object) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

  override function error(p0: Marker, p1: String, p2: Throwable) {
    throw MUST_IMPLEMENT_THIS_METHOD
  }

}