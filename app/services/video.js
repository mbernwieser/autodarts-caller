import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class VideoService extends Service {
  @service notifications;

  @tracked overlayIsVisible = false;
  @tracked videoElement = null;
  @tracked fileNotFound = false;

  async playVideo(filename) {
    this.fileNotFound = false;

    this.videoElement.src = `/videos/${filename}.mp4`;

    // Wait for load/error-events to fire.
    // 404 should be received immeadiately,
    // so it shouldn't be a problem if the
    // loading of the video takes longer than this timeout
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (this.fileNotFound) {
      console.log(`video file not found! (path: /videos/${filename}.mp4)`);
      return;
    }

    this.videoElement.classList.remove('hiding');
    this.overlayIsVisible = true;

    this.videoElement.play();

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
