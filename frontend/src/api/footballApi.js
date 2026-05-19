const API_BASE_URL = "http://localhost:5000/api/football";

async function fetchFootballData(endpoint, params) {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(`${API_BASE_URL}${endpoint}?${queryString}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function getTeams(league, season) {
  return fetchFootballData("/teams", {
    league,
    season,
  });
}

export function getPlayers({ league, season, team }) {
  return fetchFootballData("/players", {
    league,
    season,
    team,
  });
}