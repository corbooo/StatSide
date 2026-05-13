import { useState } from "react";

const leagues = [
  { id: 39, name: "Premier League" },
  { id: 140, name: "La Liga" },
  { id: 135, name: "Serie A" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1" },
  { id: 253, name: "MLS" },
];

const seasons = [2025, 2024, 2023, 2022];

function CompareTeams({ onBack }) {
  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState("");

  const selectedLeague = leagues.find(
    (league) => league.id === Number(leagueId)
  );

  return (
    <main className="app">
      <section className="compare-card">
        <button className="back-button" onClick={onBack}>
          Back
        </button>

        <div className="compare-header">
          <p className="eyebrow">Team Comparison</p>

          <h2>Compare Teams</h2>

          <div className="accent-line"></div>

          <p className="subtitle">
            Choose two soccer teams and compare their stats side by side.
          </p>
        </div>

        <div className="filter-row">
          <label className="filter-field">
            <span>League</span>
            <select
              value={leagueId}
              onChange={(event) => setLeagueId(event.target.value)}
            >
              <option value="">Select league</option>
              {leagues.map((league) => (
                <option key={league.id} value={league.id}>
                  {league.name}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Season</span>
            <select
              value={season}
              onChange={(event) => setSeason(event.target.value)}
            >
              <option value="">Select season</option>
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>Team A</span>
            <select disabled>
              <option>Select league first</option>
            </select>
          </label>

          <label className="filter-field">
            <span>Team B</span>
            <select disabled>
              <option>Select league first</option>
            </select>
          </label>
        </div>

        <div className="results-box">
          {selectedLeague && season ? (
            <div className="results-message">
              <p>
                Ready to load teams from {selectedLeague.name} for {season}.
              </p>
            </div>
          ) : (
            <p>Select a league and season to begin.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default CompareTeams;