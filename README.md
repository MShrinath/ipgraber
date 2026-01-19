# IPGRABER

IPGRABER is a simple project built around an **IP-grabbing link**.

**Live Demo:** [ipghost.netlify.app](https://ipghost.netlify.app)

When someone opens the link, the app:
- collects their IP address
- retrieves basic network / ISP and location info
- parses device and browser details
- displays the info on the page
- **sends the same data to an API endpoint of your choice**

The frontend is intentionally minimal and can be changed however you want without affecting how the data is collected or sent.

To customize the page, edit [index.ejs](src/views/index.ejs).

---

## What It Does

- Captures visitor IP address
- Gets approximate ISP and location data
- Detects browser, OS, device type, and CPU architecture
- Sends all collected data to a custom endpoint (webhook, API, etc.)

---

## Deploy to Netlify

1. Fork/clone this repo
2. Connect to Netlify
3. Configure build settings:
   - **Build command:** `npm i`
   - **Functions directory:** `src/api`
4. Set environment variable: `API_ENDPOINT` in Netlify dashboard
5. Deploy!

