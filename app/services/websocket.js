import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WebsocketService extends Service {
  @service notifications;
  @service sound;

  @tracked socket = null;
  @tracked isInitializing = false;
  @tracked pointsCalled = false;

  initializeSocket(ip) {
    this.isInitializing = true;

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    const url = `ws://${ip}:3180/api/events`;

    this.socket = new WebSocket(url);

    console.log('Initializing...');

    this.socket.addEventListener('open', (event) => {
      this.onConnectionOpen(event);
    });

    this.socket.addEventListener('message', (event) => {
      this.onMessage(event);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);

      if (this.isInitializing) {
        setTimeout(() => {
          this.disconnect();
          this.notifications.error("Verbindung fehlgeschlagen! Falsche IP oder Autodarts nicht gestartet?");
        }, 1000);
      }
    });
  }

  @action
  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.close();
    this.socket = null;
    this.isInitializing = false;
  }

  onConnectionOpen() {
    this.isInitializing = false;

    this.sound.playAudio('gameon');
  }

  onMessage(event) {
    const message = JSON.parse(event.data);

    const { throws } = message.data;

    if (message.type !== 'state') {
      return;
    }

    if (throws.length === 1) {
      // reset pointsCalled to prevent multiple calls because of an aborted takeout
      this.pointsCalled = false;
    }

    if (this.pointsCalled || throws.length !== 3) {
      return;
    }

    const points = throws.reduce(
      (sum, t) => (sum += t.segment.number * t.segment.multiplier),
      0
    );

    console.log(`Russ Bray: ${points}`);

    this.sound.playAudio(points);
    this.pointsCalled = true;
  }
}
