import Service from '@ember/service';

export default class SoundService extends Service {
  playAudio(filename, duration = null) {
    const audio = new Audio(`sounds/${filename}.mp3`);

    audio.addEventListener('error', () => {
      console.log(`sound file not found! (path: sounds/${filename}.mp3)`);
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
