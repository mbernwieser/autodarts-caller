const pluginName = "test";

window.addEventListener("INIT_PLUGINS", () => {
  window.AUTODARTS_CALLER_PLUGINS[pluginName] = true;
});

let counter = 0;

window.addEventListener("THROW", e => {
  console.log("Throw!");
  console.log(e);
  counter += 1;
  e.notificationService.success("Throw registered! #" + counter);
});
