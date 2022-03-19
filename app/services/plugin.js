import Service, { service } from '@ember/service';
import { action } from '@ember/object';

export default class PluginService extends Service {
  @service('sound') soundService;
  @service notifications;

  initializePlugins() {
    window.AUTODARTS_CALLER_PLUGINS = {};
    window.dispatchEvent(new Event('INIT_PLUGINS'));
  }

  get pluginStates() {
    return window.AUTODARTS_CALLER_PLUGINS;
  }

  get registeredPlugins() {
    return Object.keys(window.AUTODARTS_CALLER_PLUGINS).filter(
      (p) => p !== 'template'
    );
  }

  createEvent(eventName) {
    const event = new Event(eventName);
    event.notificationService = this.notifications;
    event.soundService = this.soundService;
    return event;
  }

  @action
  togglePlugin(pluginName, toggleEvent) {
    const { checked } = toggleEvent.target;
    window.AUTODARTS_CALLER_PLUGINS[pluginName] = checked;
    localStorage.setItem(`AUTODARTS_CALLER_PLUGINS_${pluginName}`, checked);
  }
}
