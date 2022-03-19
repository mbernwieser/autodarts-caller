import Service, { service } from '@ember/service';

export default class SoundService extends Service {
  @service notifications;

  playAudio(filename, duration = null) {
    const audio = new Audio(`sounds/${filename}.mp3`);

    audio.addEventListener('error', () => {
      this.notifications.error(`Datei nicht gefunden: sounds/${filename}.mp3`);
    });

    audio.play();

    if (!duration) {
      return;
    }

    setTimeout(() => {
      audio.pause();
    }, duration);
  }
}
