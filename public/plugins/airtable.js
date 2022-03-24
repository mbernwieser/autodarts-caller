(function () {
  // ---------------- CHANGE THIS TO THE NAME OF YOUR PLUGIN -------------------
  const pluginName = 'AirTable';

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
    //const lastThrow = event.throws[event.throws.length - 1];

    const baseId = 'xxx';
    const apiKey = 'yyy';

    setInterval(() => {
      fetch(`https://api.airtable.com/v0/${baseId}/throws`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          segment: 20,
          multiplier: 3,
        }),
      });
    }, 2000);
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
