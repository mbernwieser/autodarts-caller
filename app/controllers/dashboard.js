import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardController extends Controller {
  @service plugin;
  @service sound;
  @service notifications;
  @service websocket;

  ip = localStorage.getItem('ip');

  get inputIsDisabled() {
    return this.websocket.isInitializing || this.websocket.socket || !this.ip;
  }

  get additionalSoundButtons() {
    return [
      {
        filename: 'gameon',
        label: 'Game On!',
      },
      {
        filename: '1st',
        label: 'Game shot and the 1st leg',
      },
    ];
  }

  @action
  connect() {
    localStorage.setItem('ip', this.ip);
    this.websocket.initializeSocket(this.ip);
    console.log(this.plugin.registeredPlugins);

    const event = new Event("THROW");
    event.throw = {foo: "bar"};
    event.notificationService = this.notifications;
    window.dispatchEvent(event);
  }

  @action
  playAdditionalSound(btn) {
    this.sound.playAudio(btn.filename);
  }
}
