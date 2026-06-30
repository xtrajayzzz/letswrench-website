(function () {
  var config = window.LETS_WRENCH_CONFIG || {};
  var GA_ID = config.ga4Id || "G-XXXXXXXXXX";

  // Vercel Web Analytics (works on Vercel deployments only)
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
  if (!document.querySelector('script[src="/_vercel/insights/script.js"]')) {
    var insights = document.createElement("script");
    insights.defer = true;
    insights.src = "/_vercel/insights/script.js";
    document.head.appendChild(insights);
  }

  function trackEvent(name, params) {
    if (typeof gtag === "function") {
      gtag("event", name, params || {});
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (!link) return;

    var action = link.getAttribute("data-track");
    var href = link.getAttribute("href") || "";

    if (action === "call") {
      trackEvent("click_call", {
        page: window.location.pathname,
        link_url: href
      });
    }

    if (action === "text") {
      trackEvent("click_text", {
        page: window.location.pathname,
        link_url: href
      });
    }

    if (action === "form") {
      trackEvent("form_submit", {
        page: window.location.pathname
      });
    }
  });

  if (GA_ID && GA_ID !== "G-XXXXXXXXXX") {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    gtag("js", new Date());
    gtag("config", GA_ID);
  }
})();
