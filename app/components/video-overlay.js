import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class VideoOverlayComponent extends Component {
  @service('video') videoService;

  @action
  registerVideoElement(element) {
    this.videoService.videoElement = element;
  }
}
