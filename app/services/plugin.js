import Service from '@ember/service';

export default class PluginService extends Service {
  initializePlugins() {
    window.AUTODARTS_CALLER_PLUGINS = {};
    window.dispatchEvent(new Event('INIT_PLUGINS'));
  }

  get registeredPlugins() {
    return Object.keys(window.AUTODARTS_CALLER_PLUGINS);
  }
}
