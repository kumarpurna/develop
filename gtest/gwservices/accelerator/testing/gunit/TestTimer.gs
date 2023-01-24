package gwservices.accelerator.testing.gunit

class TestTimer {

  var _startTime: long

  public function begin() {
    _startTime = System.currentTimeMillis()
  }

  public function end(): MinutesAndSeconds {
    var endTime = System.currentTimeMillis()
    var duration = endTime - _startTime

    var seconds = duration / 1000.0
    if (seconds > 60)                              // If over a minute,
      seconds = Math.round(seconds)                //    Show only whole seconds.
    else if (seconds > 10)                         // If over 10 seconds (and under a minute),
      seconds = Math.round(seconds * 10) / 10.0    //    Show ONE digit to the right of the decimal -- like 10.3 or 59.2
    //                                             // Else...
    //                                             //    Milliseconds converted to seconds shows (up to) THREE digits to the right of the decimal.

    var minutes = seconds / 60.0                   // This division is prone to produce results with repeating decimal fractions, so...
    if (minutes > 5)                               // If it took over five minutes to run,
      minutes = Math.round(minutes)                //    then don't show any fractional amount.  (Show 5 minutes, not 5.2 minutes.)
    else if (minutes > 1)                          // One to Five minutes...
      minutes = Math.round(minutes * 10) / 10.0    //    shows one decimal place.  Ex: 1.2 or 4.6
    else                                           // Less than a minute...
      minutes = Math.round(minutes * 100) / 100.0  //    show two decimal places.  Ex:  0.00, 0.03, 0.13, 0.94
    return new MinutesAndSeconds(minutes, seconds)
  }

  public function endInMillis(): double {
    var endTime = System.currentTimeMillis()
    var duration: double = (endTime - _startTime) / 1000d
    return duration
  }

  public static class MinutesAndSeconds {
    var _minutes: double as readonly Minutes
    var _seconds: double as readonly Seconds

    public construct(minutes: double, seconds: double) {
      _minutes = _minutes
      _seconds = seconds
    }

    public function asString():String{
      return _seconds + " seconds = " + _minutes + " minutes"
    }
  }
}