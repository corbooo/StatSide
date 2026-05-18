const API_BASE_URL = "https://v3.football.api-sports.io";

async function fetchFromApiFootball(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();

    const url = `${API_BASE_URL}${endpoint}?${queryString}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "x-apisports-key": process.env.API_FOOTBALL_KEY,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("API-Football request failed:", {
        url,
        status: response.status,
        data,
        });

        throw new Error(`API-Football request failed with status ${response.status}`);
    }

    return data;
}

module.exports = {
    fetchFromApiFootball,
};