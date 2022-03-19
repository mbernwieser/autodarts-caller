import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DashboardController extends Controller {
  @service('plugin') pluginService;
  @service('sound') soundService;
  @service('websocket') websocketService;
  @service notifications;

  @tracked ip = localStorage.getItem('ip');

  get inputIsDisabled() {
    return this.websocketService.isInitializing || this.websocketService.socket;
  }

  get connectButtonIsDisabled() {
    return (
      this.websocketService.isInitializing ||
      this.websocketService.socket ||
      !this.ip
    );
  }

  get additionalSoundButtons() {
    return [
      {
        filename: 'gameon',
        label: 'Game On!',
      },
    ];
  }

  @action
  connect() {
    localStorage.setItem('ip', this.ip);
    this.websocketService.initializeSocket(this.ip);
  }

  @action
  playAdditionalSound(btn) {
    this.soundService.playAudio(btn.filename);
  }
}
