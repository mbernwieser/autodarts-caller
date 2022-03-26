import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VideoService extends Service {
  @service notifications;

  @tracked overlayIsVisible = false;
  @tracked videoElement = null;

  playVideo(filename) {
    this.videoElement.classList.remove('hiding');
    this.overlayIsVisible = true;

    setTimeout(() => {
      this.videoElement.src = `/videos/${filename}.mp4`;
      this.videoElement.play();
    }, 100);

    this.videoElement.addEventListener('ended', () => {
      this.videoElement.classList.add('hiding');
      this.stopVideo();
    });
  }

  @action
  stopVideo() {
    this.overlayIsVisible = false;
    this.videoElement.src = '';
  }
}
