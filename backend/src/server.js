const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_FOOTBALL_URL = "https://v3.football.api-sports.io";

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "StatSide backend is running",
    });
});

app.get("/api/countries", async (req, res) => {
  if (!process.env.API_FOOTBALL_KEY) {
    return res.status(500).json({
      error: "API_FOOTBALL_KEY is missing from backend/.env",
    });
  }

  try {
    const response = await fetch(`${API_FOOTBALL_URL}/countries`, {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY,
      },
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("API-Football error:", error.message);

    res.status(500).json({
      error: "Failed to fetch countries from API-Football",
    });
  }
});

app.listen(PORT, () => {
    console.log(`StatSide backend running on port ${PORT}`);
});