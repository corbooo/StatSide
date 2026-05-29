import { useState } from "react";
import TeamSelector from "../components/TeamSelector";
import { getTeamStatistics } from "../api/footballApi";

function getValue(value) {
  return value ?? "N/A";
}

function getTeamRows(stats) {
  return [
    ["Played", stats.fixtures?.played?.total],
    ["Wins", stats.fixtures?.wins?.total],
    ["Draws", stats.fixtures?.draws?.total],
    ["Losses", stats.fixtures?.loses?.total],
    ["Goals For", stats.goals?.for?.total?.total],
    ["Goals Against", stats.goals?.against?.total?.total],
    ["Clean Sheets", stats.clean_sheet?.total],
    ["Failed to Score", stats.failed_to_score?.total],
    ["Form", stats.form || "N/A"],
  ];
}

function CompareTeams({ onBack }) {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [teamAStats, setTeamAStats] = useState(null);
  const [teamBStats, setTeamBStats] = useState(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonError, setComparisonError] = useState("");

  const canCompare = teamA && teamB;
  const hasResults = teamAStats && teamBStats;

  function handleTeamASelect(team) {
    setTeamA(team);
    clearComparison();
  }

  function handleTeamBSelect(team) {
    setTeamB(team);
    clearComparison();
  }

  function clearComparison() {
    setTeamAStats(null);
    setTeamBStats(null);
    setComparisonError("");
  }

  async function handleCompare() {
    if (!canCompare) {
      return;
    }

    try {
      setIsComparing(true);
      clearComparison();

      const [teamAData, teamBData] = await Promise.all([
        getTeamStatistics({
          league: teamA.leagueId,
          season: teamA.season,
          team: teamA.id,
        }),
        getTeamStatistics({
          league: teamB.leagueId,
          season: teamB.season,
          team: teamB.id,
        }),
      ]);

      setTeamAStats(teamAData.response);
      setTeamBStats(teamBData.response);
    } catch (error) {
      console.error(error);
      setComparisonError("Could not load team statistics.");
    } finally {
      setIsComparing(false);
    }
  }

  return (
    <main className="app">
      <section className="compare-card">
        <button className="back-button" onClick={onBack}>
          Back
        </button>

        <div className="compare-header">
          <h2>
            Compare <span>Teams</span>
          </h2>

          <div className="accent-line"></div>

          <p className="subtitle">
            Choose two soccer teams from any supported league and season.
          </p>
        </div>

        <div className="selector-grid">
          <TeamSelector label="Team A" onSelect={handleTeamASelect} />
          <TeamSelector label="Team B" onSelect={handleTeamBSelect} />
        </div>

        <div className="compare-action-row">
          <button
            className="compare-button"
            disabled={!canCompare || isComparing}
            onClick={handleCompare}
          >
            {isComparing ? "Comparing..." : "Compare Teams"}
          </button>
        </div>

        {comparisonError && <p className="error-message">{comparisonError}</p>}

        {hasResults && (
          <div className="comparison-results-card">
            <div className="comparison-results-header">
              <h3>Team Stats</h3>
              <p>Selected season stats</p>
            </div>

            <div className="comparison-grid">
              <StatsCard
                image={teamA.logo}
                title={teamA.name}
                subtitle={[teamA.country, teamA.leagueName, teamA.season]
                  .filter(Boolean)
                  .join(" • ")}
                rows={getTeamRows(teamAStats)}
              />

              <StatsCard
                image={teamB.logo}
                title={teamB.name}
                subtitle={[teamB.country, teamB.leagueName, teamB.season]
                  .filter(Boolean)
                  .join(" • ")}
                rows={getTeamRows(teamBStats)}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function StatsCard({ image, title, subtitle, rows }) {
  return (
    <article className="stats-card">
      <div className="stats-card-heading">
        <img src={image} alt="" />
        <div>
          <h4>{title}</h4>
          <p>{subtitle || "Selected team"}</p>
        </div>
      </div>

      <div className="stats-list">
        {rows.map(([label, value]) => (
          <div className="stats-row" key={label}>
            <span>{label}</span>
            <strong>{getValue(value)}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

export default CompareTeams;
