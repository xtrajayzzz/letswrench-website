/* Avatar fallback only — each review has its own avatar URL in reviews.js */

window.REVIEW_AVATAR_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">' +
      '<circle cx="22" cy="22" r="22" fill="#e5e5e5"/>' +
      '<circle cx="22" cy="17" r="7" fill="#a3a3a3"/>' +
      '<ellipse cx="22" cy="36" rx="11" ry="9" fill="#a3a3a3"/>' +
    "</svg>"
  );

window.handleAvatarError = function (img) {
  var seed = img.getAttribute("data-avatar-seed") || "letswrench";

  if (!img.getAttribute("data-retried")) {
    img.setAttribute("data-retried", "1");
    img.src =
      "https://api.dicebear.com/7.x/thumbs/png?seed=" +
      encodeURIComponent(seed) +
      "&size=88";
    return;
  }

  img.onerror = null;
  img.src = window.REVIEW_AVATAR_PLACEHOLDER;
  img.classList.add("review-avatar--placeholder");
};
