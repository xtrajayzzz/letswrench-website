(function () {
  function starsHtml() {
    return '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>';
  }

  function googleBadgeHtml() {
    return (
      '<div class="review-google-badge" title="Posted on Google">' +
      '<span class="review-google-icon-wrap" aria-hidden="true">' +
      '<svg class="review-google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>' +
      '<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>' +
      '<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>' +
      '<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>' +
      "</svg></span>" +
      '<span class="review-google-label">Posted on Google</span>' +
      "</div>"
    );
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
      googleBadgeHtml() +
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

  initReviews();
  initFaq();
})();
