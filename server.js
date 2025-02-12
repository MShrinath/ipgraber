const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to extract real IP
app.get("/", (req, res) => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (ip.includes(",")) ip = ip.split(",")[0]; // In case of multiple proxies

    res.render("index", { ip });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
