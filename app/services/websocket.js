import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class WebsocketService extends Service {
  @service('plugin') pluginService;
  @service('sound') soundService;
  @service notifications;

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

    this.socket.addEventListener('open', (event) => {
      this.onConnectionOpen(event);
    });

    this.socket.addEventListener('message', (event) => {
      this.onMessage(event);
    });

    this.socket.addEventListener('error', (event) => {
      console.log('WebSocket error: ', event);

      // catch error during initialization
      if (this.isInitializing) {
        setTimeout(() => {
          this.disconnect();
          this.notifications.error(
            'Verbindung fehlgeschlagen! Falsche IP oder Autodarts nicht gestartet?'
          );
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

    this.soundService.playAudio('gameon');
  }

  onMessage(event) {
    const message = JSON.parse(event.data);

    const { throws } = message.data;

    if (message.type !== 'state' || message.data.event !== 'Throw detected') {
      return;
    }

    // create and dispatch event which can be handled in plugins
    const pluginEvent = this.pluginService.createEvent('THROW');
    pluginEvent.message = message;
    pluginEvent.throws = throws;
    window.dispatchEvent(pluginEvent);

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

    this.soundService.playAudio(points);
    this.pointsCalled = true;
  }
}
