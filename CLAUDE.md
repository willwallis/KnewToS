# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Knewto marketing site — a single-page static website with no build toolchain, no package manager, and no framework. Everything lives in `index.html`.

## Development

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

No build step, no install step.

## Architecture

The entire site is one file: `index.html`. It contains:

- **CSS**: All styles are in an inline `<style>` block in `<head>`. Design tokens (colors, spacing, radius) are defined as CSS custom properties on `:root`.
- **HTML**: Structured as `<header>` (sticky nav), `<main>` (sections: hero, diagram, approach, services, contact), and `<footer>`.
- **JavaScript**: Inline at the bottom of `<body>`. Handles the contact form submission and dynamic copyright year.

## Contact Form

The form POSTs `multipart/form-data` to a Cloudflare Worker at `https://contact-us.knewto.workers.dev`. The Worker is separate from this repo. Two anti-abuse mechanisms are in place:

- **Cloudflare Turnstile** (sitekey `0x4AAAAAABcc5abDdAFZBGcx`) — client-side CAPTCHA loaded from Cloudflare's CDN. The form validates that `cf-turnstile-response` is present before submitting.
- **Hidden form token** (`KT93455656_TWOE`) — validated server-side by the Worker.

On success the form is hidden and a success message is shown. On failure, Turnstile is reset so the user can retry.

## Images

Diagram images are in `images/`. The active one displayed on the page is `images/Alt Readiness3.png`.
