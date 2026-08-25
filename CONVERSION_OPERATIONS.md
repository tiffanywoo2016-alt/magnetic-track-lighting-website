# Tracklinear Conversion Operations

## After Publish

1. Verify these URLs return 200:
   - `https://tracklinear.com/scripts/conversion-tracking.js`
   - `https://tracklinear.com/c6d1ad5644698b77560ad8b4ec9c8216.txt`
   - `https://tracklinear.com/sitemap.xml`

2. Submit IndexNow after the key file is live:
   - Run `node scripts/submit-indexnow.mjs`
   - A 200 response means submitted successfully.
   - A 202 response means received and key validation is pending.

3. Add missing account-based tools:
   - Bing Webmaster Tools site verification meta tag.
   - Microsoft Clarity tracking script.
   - GA4 conversion marking for `generate_lead`, `whatsapp_click`, `email_click`, `resource_request_click` and `cta_click`.

## Account Setup Checklist

Use this section before asking Codex to add account-specific verification code. Do not guess these values; copy them from the live account screens.

### 1. Bing Webmaster Tools

Goal: verify `https://tracklinear.com`, submit sitemap, and keep Bing/IndexNow data visible.

What Tiffany needs to get from Bing:

- Verification method: HTML meta tag.
- Full meta tag, usually shaped like:
  `<meta name="msvalidate.01" content="PASTE_BING_CODE_HERE" />`

Implementation checklist:

- Add the exact Bing meta tag inside the `<head>` of `index.html`.
- Keep the tag live after verification.
- In Bing Webmaster Tools, submit:
  `https://tracklinear.com/sitemap.xml`
- Confirm Bing sees the site as verified.
- Confirm sitemap status is accepted or pending without URL errors.
- Confirm IndexNow key file is live:
  `https://tracklinear.com/c6d1ad5644698b77560ad8b4ec9c8216.txt`

Success check:

- `index.html` contains the exact `msvalidate.01` meta tag.
- Bing Webmaster Tools shows Tracklinear as verified.
- Sitemap appears in Bing Webmaster Tools.

### 2. Microsoft Clarity

Goal: record heatmaps and session replays so form friction and CTA drop-off can be diagnosed.

What Tiffany needs to get from Clarity:

- Project tracking code from Clarity.
- The tracking script includes a project ID. Do not rewrite or shorten it.

Implementation checklist:

- Add the exact Clarity tracking script inside the `<head>` of all indexable pages, or inside `scripts/conversion-tracking.js` only if the full official snippet is preserved.
- Do not add Clarity to `loading.html`, templates, redirect pages, or diagnostic pages.
- After publish, open Clarity and confirm installation status.
- Wait a few hours before judging session data; Clarity data is not always visible immediately.

First review checklist in Clarity:

- Home page: scroll depth to contact section.
- Manufacturer page: clicks on quotation form and WhatsApp.
- Product pages: form starts vs form submissions.
- Landing page: whether users reach the quote form.
- Rage clicks near form fields or CTA buttons.
- Mobile sessions with form abandonment.

### 3. GA4 Key Events

Goal: mark business actions as key events so weekly reports focus on inquiry intent instead of page views.

Events already sent by `scripts/conversion-tracking.js`:

- `generate_lead`: any form submit attempt.
- `lead_submit_success`: successful AJAX form submission.
- `whatsapp_click`: WhatsApp link click.
- `email_click`: email link click.
- `phone_click`: phone link click.
- `resource_request_click`: catalogue, datasheet, installation guide, or driver guide request click.
- `cta_click`: quotation, inquiry, project, contact, or anchor CTA click.

Recommended GA4 key events:

- Primary:
  - `generate_lead`
  - `lead_submit_success`
  - `whatsapp_click`
  - `email_click`
- Secondary:
  - `resource_request_click`
  - `cta_click`
  - `phone_click`

GA4 setup checklist:

- Open GA4 Admin for the Tracklinear property.
- Go to Events and confirm the events above appear after test activity.
- Mark the primary events as key events.
- Mark secondary events as key events only if reports become too sparse without them.
- In DebugView or Realtime, test:
  - submit a form
  - click WhatsApp
  - click email
  - click catalogue / driver matching guide
  - click a quotation CTA
- Build a simple weekly view with:
  - event name
  - page path
  - source / medium
  - campaign
  - country

Reporting rule:

- Qualified inquiry count matters more than total event count.
- `generate_lead` is a strong signal, but real business quality must still be checked in email / WhatsApp follow-up.
- Use UTM source and page path to decide where to optimize next.

### 4. Values to Send Codex

When ready, send only these account values:

- Bing verification meta tag:
  `<meta name="msvalidate.01" content="..." />`
- Microsoft Clarity full tracking script.
- Whether to mark secondary GA4 events as key events now or wait for one week of data.

Do not send passwords, account recovery codes, API secrets, or private customer data.

## UTM Rules

Use UTM links for every outbound channel that sends visitors to the site.

Examples:

- Alibaba profile: `https://tracklinear.com/?utm_source=alibaba&utm_medium=profile&utm_campaign=baseline`
- Email signature: `https://tracklinear.com/48v-magnetic-track-lighting-manufacturer-china.html?utm_source=email&utm_medium=signature&utm_campaign=sales`
- WhatsApp follow-up: `https://tracklinear.com/contact.html?utm_source=whatsapp&utm_medium=message&utm_campaign=quote_followup`
- PDF catalogue QR: `https://tracklinear.com/?utm_source=catalog_pdf&utm_medium=qr&utm_campaign=catalog`

## Response SOP

Internal rule: new form submissions should trigger a phone notification and receive the first human reply as soon as possible during working hours.

First reply should ask only for the missing decision inputs:

- track platform or dimensions
- installation method
- light module type and quantity
- driver/control requirement
- destination country
- OEM/private label requirement
