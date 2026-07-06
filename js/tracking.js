(function () {
  var config = window.LETS_WRENCH_CONFIG || {};
  var GA_ID = config.ga4Id || "";
  var ADS_ID = config.googleAdsId || "";
  var ADS_LEAD_LABEL = config.googleAdsLeadLabel || "";
  var CLARITY_ID = config.clarityId || "";

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

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  function initClarity() {
    if (!CLARITY_ID || document.querySelector('script[src*="clarity.ms/tag"]')) return;

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  function initGtag() {
    var primaryId = ADS_ID || GA_ID;
    if (!primaryId || primaryId.indexOf("XXXX") !== -1) return;
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(primaryId);
    document.head.appendChild(s);

    gtag("js", new Date());

    if (GA_ID && GA_ID !== "G-XXXXXXXXXX") {
      gtag("config", GA_ID);
    }
    if (ADS_ID) {
      gtag("config", ADS_ID);
    }
  }

  function trackEvent(name, params) {
    gtag("event", name, params || {});
  }

  function trackAdsLeadConversion() {
    if (!ADS_ID) return;

    if (ADS_LEAD_LABEL) {
      gtag("event", "conversion", {
        send_to: ADS_ID + "/" + ADS_LEAD_LABEL
      });
    }

    trackEvent("generate_lead", {
      page: window.location.pathname
    });
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

  initGtag();
  initClarity();

  if (/^\/thanks\/?$/i.test(window.location.pathname)) {
    trackAdsLeadConversion();
  }
})();
