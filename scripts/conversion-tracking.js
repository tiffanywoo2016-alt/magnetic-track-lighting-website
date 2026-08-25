(function () {
  var GA_ID = "G-WXHSW5Y7V8";
  var CLARITY_ID = "y78d9q40xm";
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

  function loadClarity() {
    if (window.clarity) return;
    window.clarity = function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.clarity.ms/tag/" + CLARITY_ID;

    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);
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
    if (value === undefined || value === null || form.querySelector('[name="' + name + '"]')) return;
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  function getFormSubject(form) {
    var legacySubject = form.querySelector('[name="_subject"]');
    if (legacySubject && legacySubject.value) return legacySubject.value;

    if (form.closest(".contact-sidebar")) return "Sidebar inquiry from Tracklinear";
    if (form.getAttribute("aria-label")) return form.getAttribute("aria-label");
    return "Tracklinear inquiry - " + document.title;
  }

  function enrichForms(utm) {
    document.querySelectorAll("form").forEach(function (form) {
      var action = form.getAttribute("action") || "";
      addHidden(form, "page_url", window.location.href);
      addHidden(form, "page_title", document.title);
      addHidden(form, "referrer", document.referrer);
      addHidden(form, "submitted_at", new Date().toISOString());
      addHidden(form, "from_name", "Tracklinear Website");

      if (action.indexOf("api.web3forms.com/submit") !== -1) {
        addHidden(form, "access_key", "d4f062b2-2834-47cc-aa4f-d9f6619d2faf");
        addHidden(form, "subject", getFormSubject(form));
      }

      if (action.indexOf("formsubmit.co/info@tracklinear.com") !== -1) {
        addHidden(form, "_subject", getFormSubject(form));
        addHidden(form, "_captcha", "false");
        addHidden(form, "_template", "table");
      }

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

        if ((form.getAttribute("action") || "").indexOf("formsubmit.co/info@tracklinear.com") !== -1) {
          event.preventDefault();
          event.stopImmediatePropagation();
          HTMLFormElement.prototype.submit.call(form);
          return;
        }

        if (form.dataset.ajax === "true") {
          event.preventDefault();
          event.stopImmediatePropagation();
          submitAjaxForm(form);
        }
      }, { capture: true });
    });
  }

  function parseResponse(response) {
    return response.text().then(function (text) {
      var data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = { message: text };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Submission failed");
      }

      return data;
    });
  }

  function showSuccess(form, success) {
    form.reset();

    if (success) {
      success.hidden = false;
      success.style.display = "block";
      success.setAttribute("aria-live", "polite");
      return;
    }

    alert("Thank you. Your inquiry has been sent.");
  }

  function submitAjaxForm(form) {
    var button = form.querySelector('[type="submit"]');
    var originalText = button ? button.textContent : "";
    var success = form.querySelector("[data-form-success]")
      || document.getElementById(form.dataset.successTarget || "form-success")
      || (form.parentElement ? form.parentElement.querySelector("#thanks") : null);

    if (button) {
      button.textContent = "Sending...";
      button.disabled = true;
    }

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(parseResponse)
      .then(function () {
        showSuccess(form, success);
        track("lead_submit_success", { form_action: form.getAttribute("action") || "" });
      })
      .catch(function (error) {
        alert((error && error.message ? error.message + "\n\n" : "") + "Please email us directly at info@tracklinear.com.");
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
  loadClarity();
  ready(function () {
    var utm = readUtm();
    enrichForms(utm);
    bindClickEvents();
  });
})();
