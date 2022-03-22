(function () {
  // ---------------- CHANGE THIS TO THE NAME OF YOUR PLUGIN -------------------
  const pluginName = 'Caller';

  // eslint-disable-next-line no-unused-vars
  window.addEventListener('THROW', (event) => {
    // if the user disabled the plugin via the web-ui exit directly
    if (!window.AUTODARTS_CALLER_PLUGINS[pluginName]) {
      return;
    }

    // --------------- ADD YOUR CUSTOM LOGIC HERE -------------------
    if (event.throws.length !== 3) {
      return;
    }

    const points = event.throws.reduce(
      (sum, t) => (sum += t.segment.number * t.segment.multiplier),
      0
    );

    event.soundService.playAudio(points);
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
