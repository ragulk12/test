// server.js
const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000; // Ensure the app listens on the PORT variable provided by Render

// In-memory storage for IP addresses
let visitorIPs = [];

// Home route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint to track visitors
app.get("/api/track", (req, res) => {
    // Get the visitor's IP address
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    
    // Check if the IP is already stored; if not, add it
    if (!visitorIPs.includes(ip)) {
        visitorIPs.push(ip);
    }

    // Respond with a message
    res.json({ message: "Visitor tracked", ip });
});

// Endpoint for admin to view visitor IPs
app.get("/api/visitors", (req, res) => {
    res.json({ visitors: visitorIPs });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
