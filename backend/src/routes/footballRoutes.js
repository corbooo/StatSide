const express = require("express");
const router = express.Router();

const { fetchFromApiFootball } = require("../services/apiFootballService");

router.get("/teams", async (req, res) => {
    try {
        const { league, season } = req.query;

        if (!league || !season) {
            return res.status(400).json({
                error: "league and season are required",
            });
        }

        const data = await fetchFromApiFootball("/teams", {
            league,
            season
        });

        res.json(data);
    } catch (error) {
        console.error("Teams route error:", error.message);

        res.status(500).json({
            error: "Failed to fetch teams",
        });
    }
});

module.exports = router;