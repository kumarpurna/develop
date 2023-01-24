package gwservices.accelerator.testing.gunit

uses gw.plugin.Plugins

uses java.lang.reflect.Proxy

/**
 * Converted from 'com.guidewire.pl.system.integration.plugins.PluginTestUtil' Java class.
 * And related 'GenericPluginInvocationHandler.UTIL' subclass in the same package.
 */
abstract class PluginTestUtil {

  private construct() {
  }

  /**
   * Gets the actual implementing object for the given plugin name.
   *
   * @see #getUnderlyingInstance(Class) 
   */
  static function getUnderlyingInstance(pluginName : String) : Object {
    var plugin = Plugins.get(pluginName)
    return getUnderlyingInstance(plugin)
  }

  /**
  * Unwrap proxies and GenericPluginInvocationHandlers to find the underlying
  * instance.
  *
  * @param instance
  * @return Underlying instance to which the Proxy is ultimately forwarding its calls.
  */
  // Converted from 'com.guidewire.pl.system.integration.plugins.GenericPluginInvocationHandler.UTIL' subclass.
  private static function getUnderlyingInstance(instance : Object) : Object {
    if (instance == null) {
      return null
    } else if (Proxy.isProxyClass(instance.getClass())) {
      return getUnderlyingInstance(Proxy.getInvocationHandler(instance))
    } else {
      return instance;
    }
  }
}
