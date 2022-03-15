import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class DashboardController extends Controller {
  @service sound;
  @service websocket;

  ip = localStorage.getItem('ip');

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
  }

  @action
  playAdditionalSound(btn) {
    this.sound.playAudio(btn.filename);
  }
}
