(function () {
  // ---------------- CHANGE THIS TO THE NAME OF YOUR PLUGIN -------------------
  const pluginName = 'template';

  // eslint-disable-next-line no-unused-vars
  window.addEventListener('THROW', (event) => {
    // if the user disabled the plugin via the web-ui exit directly
    if (!window.AUTODARTS_CALLER_PLUGINS[pluginName]) {
      return;
    }

    // --------------- ADD YOUR CUSTOM LOGIC HERE -------------------
    //console.log(event);
    //event.notificationService.success('Throw registered!');
    //event.soundService.playAudio('your-sound-file.mp3');
    //event.videoService.playVideo('your-video-file.mp4');
  });

  // -------------- DO NOT CHANGE ANYTHING BELOW HERE ---------------------

  window.addEventListener('INIT_PLUGINS', () => {
    let enabled = false;

    if (`AUTODARTS_CALLER_PLUGINS_${pluginName}` in localStorage) {
      enabled =
        localStorage.getItem(`AUTODARTS_CALLER_PLUGINS_${pluginName}`) ===
        'true';
    }

    window.AUTODARTS_CALLER_PLUGINS[pluginName] = enabled;
  });
})();
