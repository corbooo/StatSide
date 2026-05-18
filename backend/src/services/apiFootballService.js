const API_BASE_URL = "https://v3.football.api-sports.io";

async function fetchFromApiFootball(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(`${API_BASE_URL}${endpoint}?${queryString}`, {
        method: "GET",
        headers: {
            "x-apisports-key": process.env.API_FOOTBALL_KEY,
        },
    });

    if (!response.ok) {
        throw new Error(`API-Football request failed with status ${response.status}`);
    }

    const data = await response.json();

    return data;
}

module.exports = {
    fetchFromApiFootball,
};