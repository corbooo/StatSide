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

router.get("/players", async (req, res) => {
    try {
        const { league, season, team, page = 1 } = req.query;

        if (!league || !season) {
            return res.status(400).json({
                error: "league and season are required",
            });
        }

        const params = {
            league,
            season,
            page,
        };

        if (team) {
            params.team = team;
        }

        const data = await fetchFromApiFootball("/players", params);

        res.json(data);
    } catch (error) {
        console.error("Players route error:", error.message);

        res.status(500).json({
            error: "Failed to fetch players",
        });
    }
});

module.exports = router;