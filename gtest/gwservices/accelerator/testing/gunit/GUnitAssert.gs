package gwservices.accelerator.testing.gunit

uses gw.testharness.TestBase

abstract class GUnitAssert {

  private construct() {
  }

  /**
   * Assert that the <code>String</code> values in the two <code>Collection</code>s are equal.
   */
  static function assertCollectionStringValuesEquals(final expected: Collection<String>, final actual: Collection<String>) {
    assertCollectionStringValuesEquals(null, expected, actual)
  }

  /**
   * Assert that the <code>String</code> values in the two <code>Collection</code>s are equal.
   */
  static function assertCollectionStringValuesEquals(final userMessage: String,
                                                     final expected: Collection<String>,
                                                     final actual: Collection<String>) {
    TestBase.assertEquals(
        userMessage,
        "\n" + expected.toString().replace(", ", ",\n "),
        "\n" +   actual.toString().replace(", ", ",\n "))
  }

}
