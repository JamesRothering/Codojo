/**
 * Base URL of the Next.js assessment app (no trailing slash).
 *
 * Options:
 * 1. Inject before this file loads, e.g. in index.html:
 *    <script>window.CODOJO_ASSESS_APP_URL = "https://your-app.azurewebsites.net";</script>
 * 2. Edit the default below after you deploy the `assess/` app to Azure.
 *
 * Leave empty ("") until the app URL is known; primary CTAs will stay disabled with a short note.
 */
window.CODOJO_ASSESS_APP_URL = window.CODOJO_ASSESS_APP_URL || "";

window.codojoAssessmentAppHref = function codojoAssessmentAppHref(path) {
  var base = String(window.CODOJO_ASSESS_APP_URL || "").replace(/\/$/, "");
  path = path || "/assessment";
  if (!path.startsWith("/")) path = "/" + path;
  if (!base) return "#configure-assess-url";
  return base + path;
};

function applyCodojoAssessmentLinks() {
  document.querySelectorAll("[data-codojo-assess-app]").forEach(function (el) {
    var path = el.getAttribute("data-codojo-assess-path") || "/assessment";
    el.setAttribute("href", window.codojoAssessmentAppHref(path));
    if (!window.CODOJO_ASSESS_APP_URL) {
      el.setAttribute(
        "title",
        "Set window.CODOJO_ASSESS_APP_URL (see assessment-app-config.js) after deploying the Next.js app.",
      );
    }
  });
  var hint = document.getElementById("assessUrlHint");
  if (hint && !window.CODOJO_ASSESS_APP_URL) hint.hidden = false;
}

// If this file loads after DOMContentLoaded (async, late inject, etc.), a bare
// DOMContentLoaded listener would never run. readyState covers both cases.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyCodojoAssessmentLinks);
} else {
  applyCodojoAssessmentLinks();
}
