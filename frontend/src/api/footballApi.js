const API_BASE_URL = "http://localhost:5000/api/football";

export async function getTeams(league, season) {
    const response = await fetch(
        `${API_BASE_URL}/teams?league=${league}&season=${season}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch teams");
    }

    return response.json();
}

export async function getPlayers({ league, season, team }) {
    const response = await fetch(
        `${API_BASE_URL}/players?league=${league}&season=${season}&team=${team}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch players");
    }

    return response.json();
}