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
