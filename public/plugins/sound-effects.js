(function () {
  // ---------------- CHANGE THIS TO THE NAME OF YOUR PLUGIN -------------------
  const pluginName = 'Sound Effects';

  // eslint-disable-next-line no-unused-vars
  window.addEventListener('THROW', (event) => {
    // if the user disabled the plugin via the web-ui exit directly
    if (!window.AUTODARTS_CALLER_PLUGINS[pluginName]) {
      return;
    }

    const lastThrow = event.throws[event.throws.length - 1];

    if (lastThrow.segment.multiplier === 1) {
      event.soundService.playAudio('sound-effect-plugin/single.mp3');
    }

    if (lastThrow.segment.multiplier === 2) {
      event.soundService.playAudio('sound-effect-plugin/double.mp3');
    }

    if (lastThrow.segment.multiplier === 3) {
      event.soundService.playAudio('sound-effect-plugin/triple.mp3');
    }

    if (lastThrow.segment.multiplier === 0) {
      event.soundService.playAudio('sound-effect-plugin/miss.mp3');
    }
  });

  // -------------- DO NOT CHANGE ANYTHING BELOW HERE ---------------------

  window.addEventListener('INIT_PLUGINS', () => {
    let enabled = true;

    if (`AUTODARTS_CALLER_PLUGINS_${pluginName}` in localStorage) {
      enabled =
        localStorage.getItem(`AUTODARTS_CALLER_PLUGINS_${pluginName}`) ===
        'true';
    }

    window.AUTODARTS_CALLER_PLUGINS[pluginName] = enabled;
  });
})();
