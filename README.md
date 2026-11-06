# Souls for Christ Ministries Zambia - Website

A complete, static church website for **Souls for Christ Ministries Zambia** (Lusaka, Zambia, with a branch in Chongwe).

The site is centred on the church: its founder, people, services, ministries, sermons, testimonies, gallery, giving and visit information. It includes one short, respectful acknowledgement of the spiritual family and leaders around the house, without profiling other ministries.

## Open the site

1. Double-click `START-WEBSITE.bat`.

   Or open the folder in a terminal and run:

   ```powershell
   python -m http.server 4173 --bind 127.0.0.1
   ```

2. Visit `http://127.0.0.1:4173/`.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About the church and founder | `about.html` |
| Ministries | `ministry.html` |
| Sermon notes | `sermons.html` |
| Statement of faith | `faith.html` |
| Gallery | `gallery.html` |
| Testimonies | `testimonies.html` |
| Daily devotional | `daily-devotional.html` |
| Announcements | `announcements.html` |
| Giving and partnership | `give.html` |
| Contact, visit and prayer requests | `contact.html` |
| Branches and transport | `branches-transport.html` |

## Church information used

- Church Facebook page: <https://www.facebook.com/p/Souls-for-Christ-Ministries-Zambia-100068789642989/>
- Prophetess Mulenga Chilufya Mutampuka's public Facebook and TikTok posts
- Public search-result snippets and service information

Published details on the site:

- **Church name:** Souls for Christ Ministries Zambia
- **Motto:** Winning souls to Christ
- **Leader:** Prophetess Mulenga Chilufya Mutampuka
- **Sunday service:** 09:30 - 11:00 CAT
- **Tuesday service:** 20:00 CAT
- **Main gathering:** Lusaka, Zambia
- **Branch:** Chongwe (being planted; call for current details)
- **Phone:** +260 979 918 138 / +260 966 429 393
- **Facebook:** the church page linked above
- **TikTok:** <https://www.tiktok.com/@mulengachilufyamu>

### Please confirm before publishing

The exact venue and the Tuesday service start time are not consistently published. The site therefore says "Lusaka, Zambia" and asks visitors to call for directions. Please confirm the venue, service times and branch details with the church office before going live.

The public posts also show Prophetess Chilufya serving alongside her blood sister, **Prophetess Mubanga Mutampuka**. This is presented on the About page as part of the family and fellowship around the ministry.

## Spiritual family

The site includes a short, respectful note that the church honours the spiritual family and leaders God has placed around the house. Their prayers, counsel and fellowship are acknowledged with gratitude. No other church or ministry is profiled on the site.

## Sermon notes

`sermons.html` contains study notes and a full sermon outline for **"Your situation is not bigger than God"**, built from the themes in the church's public Sunday-service posts and reels. It also gathers notes on:

- Winning souls to Christ
- Mountain prayers: God is answering
- Seek God in every situation
- A heart of thanksgiving

The full messages remain on the church's Facebook page.

## Testimonies

`testimonies.html` gathers anonymised summaries of testimonies shared in the church family and on public platforms:

- Healing
- Fruitfulness
- Marriage restoration
- Provision
- Deliverance
- Salvation

Names and identifying details are withheld to protect privacy. The page includes a WhatsApp button for sharing a testimony.

## Photography

The supplied photographs were:

- Auto-oriented and colour-corrected (brightness, contrast, colour and sharpness)
- Resized for the web (maximum 1800 px)
- Saved as optimised progressive JPEGs for broad compatibility
- Also exported as WebP for future use
- Given width and height attributes to prevent layout shift

The best supplied portraits of Prophetess Chilufya are used for the hero and founder sections, including the new studio portrait and family portrait. Low-resolution supplied images were not used on the site.

Files live in `assets/images/`.

## Language translation

A floating language switcher appears on every page. It currently supports:

- English
- Bemba (`bem`)
- Nyanja (`ny`)
- Tumbuka (`tum`)

All interface and page text is translated locally through `assets/js/translations.js` (500+ strings per language), so switching is instant and does not need a third-party widget. Proper names, phone numbers and the church name are protected from translation.

The translations were generated with Google Translate and then lightly polished for the navigation and service names. A native Bemba, Nyanja or Tumbuka speaker should review the wording before the site goes live, especially the longer devotional, faith and testimony paragraphs.

To add another language:

1. Add it to the `LANGS` array in `assets/js/site.js`.
2. Add a matching map to `window.SOULS_TRANSLATIONS` in `assets/js/translations.js`.
3. Provide the language name and code.

## Features

- Imperial emerald, antique gold and ivory colour palette
- Sticky header with utility bar and "Watch Live" button
- Full-bleed hero with founder portrait and service-times strip
- Live-service countdown
- Faith tools: daily devotional, sermon notes, prayer request and giving
- Statement of faith page
- Partnership section on the giving page
- "What to expect" visit information
- Community-care section for the Church, Friends' and Mothers' Committees
- Testimonies page
- Accessible photo gallery with a lightbox and "show all pictures" grid
- WhatsApp visit and prayer-request forms (no server required)
- Google Maps embed for Lusaka, Zambia
- Local fonts (Allura, Cinzel, Inter) and icons - no Google Fonts request
- SEO title/description, Open Graph and Twitter card metadata
- Mobile menu with keyboard/Escape support

## Deployment

Upload the whole folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, cPanel, etc.). Keep the folder structure intact:

```
index.html
about.html
faith.html
...
assets/
  css/
  fonts/
  images/
  js/
```

No database, build command or server-side runtime is required. The contact forms compose a WhatsApp message on the visitor's device.

## Credit

Design adapted for Souls for Christ Ministries Zambia from the Royal Priesthood Assemblies International website by Makinka Web Developers.
