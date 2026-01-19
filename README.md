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

- IP Address — obtained from request headers
- Location & ISP — resolved using ipinfo.io
- Browser & OS — parsed from the User-Agent header
- Device Type & CPU — inferred from User-Agent data
- Timestamp — generated on the server (IST)
- External Sync — forwarded to a custom API endpoint

---

## Deploy to Netlify

1. Fork/clone this repo
2. Connect to Netlify
3. Configure build settings:
   - **Build command:** `npm i`
   - **Functions directory:** `src/api`
4. Set environment variable: `API_ENDPOINT` in Netlify dashboard
5. Deploy!

