const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
const SPRING_BOOT_URL = "http://localhost:8080/api";

app.use(cors());
app.use(express.json());

// Proxy request to Spring Boot API
app.get("/users", async (req, res) => {
    try {
        const response = await axios.get(`${SPRING_BOOT_URL}/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.post("/users", async (req, res) => {
    try {
        const response = await axios.post(`${SPRING_BOOT_URL}/users`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
