const express = require("express");
const path = require("path");
const UAParser = require("ua-parser-js");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to extract real IP
app.get("/", (req, res) => {
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

    res.render("index", { ip, deviceInfo });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
