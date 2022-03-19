import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service('plugin') pluginService;

  beforeModel() {
    this.pluginService.initializePlugins();
  }
}
