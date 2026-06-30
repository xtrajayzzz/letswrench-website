(function () {
  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollBehavior() {
    return prefersReducedMotion() ? "auto" : "smooth";
  }

  function starsHtml() {
    return '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>';
  }

  function initialsFromName(name) {
    var parts = name.replace(/\./g, "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }

  function avatarColor(seed) {
    var colors = ["#1a73e8", "#34a853", "#9334e6", "#0d9488", "#1967d2", "#c5221f", "#e37400", "#5f6368"];
    var h = 0;
    for (var i = 0; i < seed.length; i++) {
      h = seed.charCodeAt(i) + ((h << 5) - h);
    }
    return colors[Math.abs(h) % colors.length];
  }

  function initialsAvatarHtml(name) {
    var seed = name.replace(/\s+/g, "-").toLowerCase();
    var initials = initialsFromName(name);
    var bg = avatarColor(seed);
    return (
      '<span class="review-avatar review-avatar--initials" style="background-color:' +
      bg +
      '" aria-hidden="true">' +
      initials +
      "</span>"
    );
  }

  function googleBadgeHtml() {
    return (
      '<span class="review-google-badge" title="Customer review">' +
      '<span class="review-google-icon-wrap">' +
      '<svg class="review-google-icon" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
      '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
      '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>' +
      '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
      "</svg></span>" +
      '<span class="review-google-label">Review</span></span>"
    );
  }

  function reviewCardHtml(review) {
    var avatar = initialsAvatarHtml(review.name);
    var dateLine = review.ago
      ? '<span class="review-date">' + review.ago + "</span>"
      : "";

    return (
      '<blockquote class="review">' +
      googleBadgeHtml() +
      '<div class="review-top">' +
      avatar +
      '<div class="review-meta">' +
      starsHtml() +
      '<cite class="review-author">' +
      review.name +
      " · " +
      review.place +
      "</cite>" +
      dateLine +
      "</div></div>" +
      "<p class=\"review-text\">" +
      review.text +
      "</p>" +
      "</blockquote>"
    );
  }

  function shuffleReviews(list) {
    var shuffled = list.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }
    return shuffled;
  }

  function initReviews() {
    var reviews = window.LETS_WRENCH_REVIEWS;
    if (!reviews || !reviews.length) return;

    reviews = shuffleReviews(
      reviews.map(function (review) {
        return Object.assign({}, review);
      })
    );

    var track = document.getElementById("reviews-track");
    var allGrid = document.getElementById("reviews-all");
    var counter = document.getElementById("review-counter");
    var showAllBtn = document.getElementById("show-all-reviews");
    var prevBtn = document.querySelector(".carousel-prev");
    var nextBtn = document.querySelector(".carousel-next");

    if (!track) return;

    reviews.forEach(function (review) {
      track.insertAdjacentHTML("beforeend", '<div class="review-slide">' + reviewCardHtml(review) + "</div>");
      if (allGrid) {
        allGrid.insertAdjacentHTML("beforeend", reviewCardHtml(review));
      }
    });

    var total = reviews.length;
    var counterLabel = counter && counter.getAttribute("data-total-label");
    var totalDisplay = counterLabel || String(total);
    var showAllLabel = showAllBtn && showAllBtn.getAttribute("data-total-label");
    var showAllText = showAllLabel ? "See all " + showAllLabel + " reviews" : "See all " + total + " reviews";

    if (counter) {
      counter.setAttribute("aria-live", "polite");
      counter.setAttribute("aria-atomic", "true");
      counter.textContent = "1 of " + totalDisplay;
    }
    if (showAllBtn) showAllBtn.textContent = showAllText;

    function updateCounter() {
      if (!counter || !track) return;
      var slide = track.querySelector(".review-slide");
      if (!slide) return;
      var slideWidth = slide.offsetWidth + 12;
      var index = Math.round(track.scrollLeft / slideWidth) + 1;
      counter.textContent = Math.min(Math.max(index, 1), total) + " of " + totalDisplay;
    }

    function scrollBySlide(direction) {
      var slide = track.querySelector(".review-slide");
      if (!slide) return;
      var amount = (slide.offsetWidth + 12) * direction;
      track.scrollBy({ left: amount, behavior: scrollBehavior() });
    }

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollBySlide(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollBySlide(1);
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        scrollBySlide(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        scrollBySlide(1);
      });
    }

    track.addEventListener("scroll", updateCounter, { passive: true });

    if (showAllBtn && allGrid) {
      showAllBtn.addEventListener("click", function () {
        var expanded = allGrid.classList.toggle("is-visible");
        showAllBtn.textContent = expanded ? "Hide reviews" : showAllText;
        showAllBtn.setAttribute("aria-expanded", expanded ? "true" : "false");
        if (expanded) {
          allGrid.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
        }
      });
    }
  }

  function setFaqItemState(item, expanded) {
    if (!item) return;
    var btn = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (btn) btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (answer) answer.setAttribute("aria-hidden", expanded ? "false" : "true");
  }

  function initFaq() {
    var faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (btn, index) {
      var item = btn.closest(".faq-item");
      var answer = item && item.querySelector(".faq-answer");

      if (answer) {
        if (!answer.id) answer.id = "faq-answer-" + (index + 1);
        btn.setAttribute("aria-controls", answer.id);
      }

      setFaqItemState(item, false);

      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
          open.classList.remove("is-open");
          setFaqItemState(open, false);
        });

        if (!isOpen) {
          item.classList.add("is-open");
          setFaqItemState(item, true);
        }
      });
    });
  }

  var ADS_CITIES = {
    omaha: "Omaha",
    bellevue: "Bellevue",
    papillion: "Papillion",
    "la-vista": "La Vista",
    elkhorn: "Elkhorn",
    gretna: "Gretna",
    "council-bluffs": "Council Bluffs",
    "greater-omaha": "Greater Omaha"
  };

  var ADS_NEARBY_CITIES = [
    "Omaha",
    "Bellevue",
    "Papillion",
    "La Vista",
    "Elkhorn",
    "Gretna",
    "Council Bluffs"
  ];

  var ADS_SERVICES = {
    diagnostics: {
      line1: "Check Engine Light?",
      line2: "We Come To You",
      cityRole: "Check Engine Light?",
      titleName: "Check Engine Light & Diagnostics",
      subhead: "Mobile computer diagnostics at your home, work, or roadside — fee waived with repair",
      callLabel: "Tap to call — same-day diagnostics"
    },
    brakes: {
      line1: "Mobile Brake Repair",
      line2: "We Come To You",
      cityRole: "Mobile Brake Repair",
      titleName: "Mobile Brake Repair",
      subhead: "Pads, rotors & brake inspections at your location — same-day in the greater Omaha area",
      callLabel: "Tap to call — free brake quote"
    },
    battery: {
      line1: "Car Won't Start?",
      line2: "We Come To You",
      cityRole: "Car Won't Start?",
      titleName: "Battery, Starter & Alternator",
      subhead: "Battery, starter & alternator — we come test it, jump it, or fix it on the spot",
      callLabel: "Tap to call — we'll get you started"
    },
    ac: {
      line1: "A/C Not Blowing Cold?",
      line2: "Mobile A/C Repair",
      cityRole: "Mobile A/C Repair",
      titleName: "Mobile A/C Repair",
      subhead: "A/C repair at your home or work — stay comfortable without the shop wait",
      callLabel: "Tap to call — free A/C quote"
    },
    maintenance: {
      line1: "Oil Change & Maintenance",
      line2: "In Your Driveway",
      cityRole: "Mobile Oil Change & Maintenance",
      titleName: "Mobile Oil Change & Maintenance",
      subhead: "Oil changes, belts & tune-ups at your home or work — no waiting room",
      callLabel: "Tap to call — maintenance quote"
    },
    "free-quote": {
      line1: "Free Quote",
      line2: "No Obligation",
      cityRole: "Free Quote",
      titleName: "Free Quote — Mobile Mechanic",
      subhead: "Free quote · Same-day repairs · We come to your home, work, or roadside",
      callLabel: "Tap to call — get your free quote"
    }
  };

  function cityNameFromSlug(slug) {
    if (!slug) return null;
    return ADS_CITIES[slug] || null;
  }

  function nearbyCitiesLabel(cityName) {
    return ADS_NEARBY_CITIES.filter(function (name) {
      return name !== cityName;
    }).join(", ");
  }

  function applyAdsCity(cityName, citySlug) {
    document.body.setAttribute("data-ads-city", citySlug || cityName.toLowerCase());

    var isRegion = cityName === "Greater Omaha";
    var inPlace = isRegion ? "the greater Omaha area" : cityName;

    var heroCity = document.querySelector(".hero-city");
    if (heroCity) heroCity.textContent = cityName;

    document.title = isRegion
      ? "Greater Omaha Mobile Mechanic | LetsWrench · 24/7"
      : cityName + " Mobile Mechanic | LetsWrench · 24/7 Greater Omaha";

    var meta = document.getElementById("meta-description");
    if (meta) {
      meta.setAttribute(
        "content",
        cityName +
          " mobile mechanic — same-day repairs. LetsWrench comes to your home, work, or roadside 24/7. 350+ five-star reviews. Lifetime warranty on our work. Tap to call (531) 999-6507."
      );
    }

    var areaLine = document.querySelector(".lp-area-line");
    if (areaLine) {
      areaLine.innerHTML = isRegion
        ? "Serving the <strong>greater Omaha area</strong> — " + nearbyCitiesLabel(cityName) + " &amp; nearby"
        : "Serving <strong>" +
          cityName +
          "</strong> and nearby — " +
          nearbyCitiesLabel(cityName) +
          " &amp; the greater Omaha area";
    }

    var pricingTitle = document.getElementById("pricing-city-title");
    if (pricingTitle) {
      pricingTitle.textContent =
        "We pride ourselves on fair, competitive pricing in " + inPlace;
    }

    var finalTitle = document.querySelector(".lp-final__title");
    if (finalTitle) {
      finalTitle.textContent = "Need a mobile mechanic in " + inPlace + "?";
    }
  }

  function applyAdsService(service, cityName) {
    var heroCity = document.querySelector(".hero-city");
    var heroRole = document.querySelector(".hero-role");

    if (cityName) {
      if (heroCity) heroCity.textContent = cityName;
      if (heroRole) heroRole.textContent = service.cityRole;
    } else {
      if (heroCity) heroCity.textContent = service.line1;
      if (heroRole) heroRole.textContent = service.line2;
    }

    document.title =
      (cityName ? cityName + " " : "") + service.titleName + " | LetsWrench Mobile Mechanic";

    var subhead = document.querySelector(".lp-subhead");
    if (subhead) subhead.textContent = service.subhead;

    var callLabel = document.querySelector(".lp-hero .lp-call__label");
    if (callLabel) callLabel.textContent = service.callLabel;
  }

  function initAdsLandingPersonalization() {
    if (!document.body.classList.contains("lp-ads")) return;

    var pathMatch = window.location.pathname.match(/\/mobile-mechanic(?:\/([^/]+))?(?:\/([^/]+))?\/?$/);
    var seg1 = pathMatch && pathMatch[1] ? pathMatch[1] : null;
    var seg2 = pathMatch && pathMatch[2] ? pathMatch[2] : null;
    var citySlug = null;
    var cityName = null;
    var serviceSlug = null;

    if (seg1 && seg2) {
      citySlug = seg1;
      cityName = cityNameFromSlug(seg1);
      serviceSlug = seg2;
    } else if (seg1) {
      if (cityNameFromSlug(seg1)) {
        citySlug = seg1;
        cityName = cityNameFromSlug(seg1);
      } else if (ADS_SERVICES[seg1]) {
        serviceSlug = seg1;
      }
    }

    if (cityName) applyAdsCity(cityName, citySlug);

    var service = serviceSlug && ADS_SERVICES[serviceSlug];
    if (service) applyAdsService(service, cityName);
  }

  function initLeadForm() {
    document.querySelectorAll(".lead-form-page").forEach(function (input) {
      input.value = window.location.href;
    });
  }

  initReviews();
  initFaq();
  initAdsLandingPersonalization();
  initLeadForm();
})();
