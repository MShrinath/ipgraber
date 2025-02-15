const express = require("express");
const path = require("path");
const UAParser = require("ua-parser-js");
const axios = require("axios");

const app = express();
const PORT = 3000;

const API_ENDPOINT = `${process.env.API_ENDPOINT}`;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip.includes(",")) ip = ip.split(",")[0];

    const parser = new UAParser(req.headers["user-agent"]);
    const deviceInfo = {
        browser: parser.getBrowser().name,
        browserVersion: parser.getBrowser().version,
        os: parser.getOS().name,
        osVersion: parser.getOS().version,
        device: parser.getDevice().type || "PC/Laptop",
        cpu: parser.getCPU().architecture || "Unknown",
        userAgent: req.headers["user-agent"],
    };

    let ispInfo = {};
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        ispInfo = {
            city: response.data.city || "Unknown",
            region: response.data.region || "Unknown",
            country: response.data.country || "Unknown",
            isp: response.data.org || "Unknown",
            dateTime: new Date().toLocaleString(),
        };
    } catch (error) {
        console.log("IP lookup failed:", error.message);
    }

    const fullData = { ip, deviceInfo, ispInfo };

    const flattenedData = {
        ip,
        ...deviceInfo,
        ...ispInfo
    };

    console.log(JSON.stringify(flattenedData, null, 2));

    // 🔥 Send to external API
    try {
        const apiResponse = await axios.post(API_ENDPOINT, flattenedData, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("✅ Data successfully sent to API:", apiResponse.data);
    } catch (error) {
        console.log("❌ Failed to send data to API:", error.message);
    }

    res.render("index", fullData);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
