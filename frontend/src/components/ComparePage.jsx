import { useState } from "react";
import { leagues, seasons } from "../data/filterOptions";

function ComparePage({ onBack, title, subtitle, itemLabel }) {
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
          <h2>
            Compare <span>{title}</span>
          </h2>

          <div className="accent-line"></div>

          <p className="subtitle">{subtitle}</p>
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
            <span>{itemLabel} A</span>
            <select disabled>
              <option>Select league first</option>
            </select>
          </label>

          <label className="filter-field">
            <span>{itemLabel} B</span>
            <select disabled>
              <option>Select league first</option>
            </select>
          </label>
        </div>

        <div className="results-box">
          {selectedLeague && season ? (
            <div className="results-message">
              <p>
                Ready to load {title.toLowerCase()} from {selectedLeague.name}{" "}
                for {season}.
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

export default ComparePage;