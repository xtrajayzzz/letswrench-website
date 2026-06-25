(function () {
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

  var GA_ID = "G-XXXXXXXXXX"; // Replace with your GA4 measurement ID

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
  });

  if (GA_ID !== "G-XXXXXXXXXX") {
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
