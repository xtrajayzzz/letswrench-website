(function () {
  function starsHtml() {
    return '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>';
  }

  function avatarImgHtml(url, seed) {
    return (
      '<img class="review-avatar" src="' + url + '" alt="" width="44" height="44" ' +
      'loading="lazy" decoding="async" referrerpolicy="no-referrer" ' +
      'data-avatar-seed="' + seed + '" ' +
      'onerror="handleAvatarError(this)">'
    );
  }

  function reviewCardHtml(review) {
    var seed = review.name.replace(/\s+/g, "-").toLowerCase();
    var avatarImg = review.avatar ? avatarImgHtml(review.avatar, seed) : "";

    return (
      '<blockquote class="review">' +
      '<div class="review-top">' +
      avatarImg +
      '<div class="review-meta">' +
      starsHtml() +
      '<cite class="review-author">' + review.name + " · " + review.place + "</cite>" +
      "</div></div>" +
      '<p class="review-text">"' + review.text + '"</p>' +
      "</blockquote>"
    );
  }

  function initReviews() {
    var reviews = window.LETS_WRENCH_REVIEWS;
    if (!reviews || !reviews.length) return;

    reviews = reviews.map(function (review) {
      return Object.assign({}, review);
    });

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

    if (counter) counter.textContent = "1 of " + totalDisplay;
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
      track.scrollBy({ left: amount, behavior: "smooth" });
    }

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
          allGrid.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
  }

  function initFaq() {
    var faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".faq-item.is-open").forEach(function (open) {
          open.classList.remove("is-open");
          open.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
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
          " mobile mechanic — same-day repairs. LetsWrench comes to your home, work, or roadside 24/7. 350+ five-star reviews. Tap to call (531) 999-6507."
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
