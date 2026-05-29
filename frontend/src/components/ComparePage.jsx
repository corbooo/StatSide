import { useState, useEffect } from "react";
import { leagues, seasons } from "../data/filterOptions";
import { getTeams } from "../api/footballApi";

function ComparePage({ onBack, title, subtitle, itemLabel, mode }) {
  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState("");

  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [error, setError] = useState("");

  const selectedLeague = leagues.find(
    (league) => league.id === Number(leagueId)
  );

  useEffect(() => {
    async function loadTeams() {
      if (mode !== "teams") {
        return;
      }

      if (!leagueId || !season) {
        return;
      }

      try {
        setIsLoadingTeams(true);
        setError("");

        setTeams([]);
        setTeamA("");
        setTeamB("");

        const data = await getTeams(leagueId, season);

        setTeams(data.response || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load teams.");
      } finally {
        setIsLoadingTeams(false);
      }
    }

    loadTeams();
  }, [leagueId, season, mode]);

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
            <select
              value={teamA}
              onChange={(event) => setTeamA(event.target.value)}
              disabled={!teams.length}
            >
              <option value="">
                {isLoadingTeams
                  ? "Loading teams..."
                  : teams.length
                  ? `Select ${itemLabel} A`
                  : "Select league and season first"}
              </option>

              {teams.map((item) => (
                <option key={item.team.id} value={item.team.id}>
                  {item.team.name}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span>{itemLabel} B</span>
            <select
              value={teamB}
              onChange={(event) => setTeamB(event.target.value)}
              disabled={!teams.length}
            >
              <option value="">
                {isLoadingTeams
                  ? "Loading teams..."
                  : teams.length
                  ? `Select ${itemLabel} B`
                  : "Select league and season first"}
              </option>

              {teams.map((item) => (
                <option key={item.team.id} value={item.team.id}>
                  {item.team.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="results-box">
          {error ? (
            <p className="error-message">{error}</p>
          ) : selectedLeague && season ? (
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