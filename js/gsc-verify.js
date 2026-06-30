(function () {
  var config = window.LETS_WRENCH_CONFIG || {};
  var code = config.gscVerification;
  if (!code) return;

  var meta = document.querySelector('meta[name="google-site-verification"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "google-site-verification";
    document.head.appendChild(meta);
  }
  meta.content = code;
})();
