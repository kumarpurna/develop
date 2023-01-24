package gwservices.accelerator.testing.gunit

uses java.io.ByteArrayOutputStream
uses java.io.PrintStream

abstract class GUnitUtil {

  private construct() {
  }

  static function captureStandardOutput(callback : block()) : String {
    var oldSystemOut = System.out
    var outputStream = new ByteArrayOutputStream()
    System.setOut(new PrintStream(outputStream))
    try {
      callback()
    } finally {
      System.setOut(oldSystemOut)
    }
    outputStream.flush()
    outputStream.close()
    return outputStream.toString()
  }

  static function captureStandardError(callback : block()) : String {
    var oldSystemOut = System.err
    var outputStream = new ByteArrayOutputStream()
    System.setErr(new PrintStream(outputStream))
    try {
      callback()
    } finally {
      System.setErr(oldSystemOut)
    }
    outputStream.flush()
    outputStream.close()
    return outputStream.toString()
  }

}
