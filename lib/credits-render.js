/* Renders assets/credits.json into the credits page. IIFE, no imports. */
(function () {
  "use strict";
  var list = document.querySelector("[data-credits]");
  if (!list) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  fetch("assets/credits.json")
    .then(function (r) { return r.json(); })
    .then(function (credits) {
      var html = Object.keys(credits).map(function (id) {
        var c = credits[id];
        var creator = c.creator_url
          ? '<a href="' + esc(c.creator_url) + '" target="_blank" rel="noopener">' + esc(c.creator) + "</a>"
          : esc(c.creator);
        return (
          "<li><strong>" + esc(c.title) + "</strong> — " + creator +
          " (" + esc(c.source) + ") · " +
          '<a href="' + esc(c.license_url) + '" target="_blank" rel="noopener">' +
          esc((c.license || "").toUpperCase()) + " " + esc(c.license_version || "") + "</a>" +
          (c.foreign_landing_url ? ' · <a href="' + esc(c.foreign_landing_url) + '" target="_blank" rel="noopener">Ver original ↗</a>' : "") +
          "</li>"
        );
      }).join("");
      list.innerHTML = html || "<li>No hay imágenes externas registradas.</li>";
    })
    .catch(function () {
      list.innerHTML = "<li>No se pudo cargar el listado de créditos en este momento.</li>";
    });
})();
