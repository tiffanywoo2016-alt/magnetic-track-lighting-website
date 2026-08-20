(function () {
  var GA_ID = "G-WXHSW5Y7V8";
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  var storageKey = "tracklinear_utm";

  function loadGA() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
  }

  function track(name, params) {
    if (!window.gtag) return;
    window.gtag("event", name, Object.assign({
      page_location: window.location.href,
      page_title: document.title
    }, params || {}));
  }

  function readUtm() {
    var search = new URLSearchParams(window.location.search);
    var data = {};
    UTM_KEYS.forEach(function (key) {
      var value = search.get(key);
      if (value) data[key] = value;
    });
    if (Object.keys(data).length) {
      data.landing_page = window.location.href;
      data.first_seen = new Date().toISOString();
      try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch (e) {}
      return data;
    }
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (e) {
      return {};
    }
  }

  function addHidden(form, name, value) {
    if (!value || form.querySelector('[name="' + name + '"]')) return;
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  function enrichForms(utm) {
    document.querySelectorAll("form").forEach(function (form) {
      addHidden(form, "page_url", window.location.href);
      addHidden(form, "page_title", document.title);
      addHidden(form, "referrer", document.referrer);
      addHidden(form, "submitted_at", new Date().toISOString());
      UTM_KEYS.forEach(function (key) {
        if (utm[key]) addHidden(form, key, utm[key]);
      });

      form.addEventListener("submit", function (event) {
        var submittedAt = form.querySelector('[name="submitted_at"]');
        if (submittedAt) submittedAt.value = new Date().toISOString();

        track("generate_lead", {
          form_action: form.getAttribute("action") || "",
          inquiry_type: (form.querySelector('[name="inquiry_type"]') || {}).value || ""
        });

        if (form.dataset.ajax === "true") {
          event.preventDefault();
          submitAjaxForm(form);
        }
      }, { capture: true });
    });
  }

  function submitAjaxForm(form) {
    var button = form.querySelector('[type="submit"]');
    var originalText = button ? button.textContent : "";
    var success = form.querySelector("[data-form-success]") || document.getElementById(form.dataset.successTarget || "");

    if (button) {
      button.textContent = "Sending...";
      button.disabled = true;
    }

    fetch(form.action, { method: "POST", body: new FormData(form) })
      .then(function (response) {
        if (!response.ok) throw new Error("Submission failed");
        form.reset();
        if (success) success.hidden = false;
        track("lead_submit_success", { form_action: form.getAttribute("action") || "" });
      })
      .catch(function () {
        window.location.href = "mailto:info@tracklinear.com?subject=Tracklinear%20Project%20Inquiry";
      })
      .finally(function () {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      });
  }

  function bindClickEvents() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";

      if (href.indexOf("wa.me/") !== -1) {
        track("whatsapp_click", { link_url: link.href });
      } else if (href.indexOf("mailto:") === 0) {
        track("email_click", { link_url: href });
      } else if (href.indexOf("tel:") === 0) {
        track("phone_click", { link_url: href });
      } else if (/catalogue|datasheet|installation|driver/i.test(href + " " + link.textContent)) {
        track("resource_request_click", {
          link_url: link.href,
          link_text: link.textContent.trim().slice(0, 80)
        });
      } else if (href.indexOf("#contact") !== -1 || href.indexOf("#quotation") !== -1 || /quotation|inquiry|project/i.test(link.textContent)) {
        track("cta_click", {
          link_url: link.href,
          link_text: link.textContent.trim().slice(0, 80)
        });
      }
    });
  }

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  loadGA();
  ready(function () {
    var utm = readUtm();
    enrichForms(utm);
    bindClickEvents();
  });
})();
