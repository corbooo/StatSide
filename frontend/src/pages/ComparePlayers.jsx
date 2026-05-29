import { useState } from "react";
import PlayerSelector from "../components/PlayerSelector";

function getValue(value) {
  return value ?? "N/A";
}

function getPlayerRows(player) {
  const stats = player.stats || {};

  return [
    ["Position", stats.games?.position],
    ["Appearances", stats.games?.appearences],
    ["Lineups", stats.games?.lineups],
    ["Minutes", stats.games?.minutes],
    ["Rating", stats.games?.rating],
    ["Goals", stats.goals?.total],
    ["Assists", stats.goals?.assists],
    ["Shots", stats.shots?.total],
    ["Shots on Goal", stats.shots?.on],
    ["Passes", stats.passes?.total],
    ["Key Passes", stats.passes?.key],
    ["Tackles", stats.tackles?.total],
    ["Yellow Cards", stats.cards?.yellow],
    ["Red Cards", stats.cards?.red],
  ];
}

function ComparePlayers({ onBack }) {
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [comparisonPlayers, setComparisonPlayers] = useState(null);

  const canCompare = playerA && playerB;

  function handlePlayerASelect(player) {
    setPlayerA(player);
    setComparisonPlayers(null);
  }

  function handlePlayerBSelect(player) {
    setPlayerB(player);
    setComparisonPlayers(null);
  }

  function handleCompare() {
    if (!canCompare) {
      return;
    }

    setComparisonPlayers({ playerA, playerB });
  }

  return (
    <main className="app">
      <section className="compare-card">
        <button className="back-button" onClick={onBack}>
          Back
        </button>

        <div className="compare-header">
          <h2>
            Compare <span>Players</span>
          </h2>

          <div className="accent-line"></div>

          <p className="subtitle">
            Choose two soccer players by selecting a league, season, team, and
            player.
          </p>
        </div>

        <div className="selector-grid">
          <PlayerSelector label="Player A" onSelect={handlePlayerASelect} />
          <PlayerSelector label="Player B" onSelect={handlePlayerBSelect} />
        </div>

        <div className="compare-action-row">
          <button
            className="compare-button"
            disabled={!canCompare}
            onClick={handleCompare}
          >
            Compare Players
          </button>
        </div>

        {comparisonPlayers && (
          <div className="comparison-results-card">
            <div className="comparison-results-header">
              <h3>Player Stats</h3>
              <p>Selected season stats</p>
            </div>

            <div className="comparison-grid">
              <StatsCard
                image={comparisonPlayers.playerA.photo}
                title={comparisonPlayers.playerA.name}
                subtitle={[
                  comparisonPlayers.playerA.teamName,
                  comparisonPlayers.playerA.leagueName,
                  comparisonPlayers.playerA.season,
                ]
                  .filter(Boolean)
                  .join(" • ")}
                rows={getPlayerRows(comparisonPlayers.playerA)}
              />

              <StatsCard
                image={comparisonPlayers.playerB.photo}
                title={comparisonPlayers.playerB.name}
                subtitle={[
                  comparisonPlayers.playerB.teamName,
                  comparisonPlayers.playerB.leagueName,
                  comparisonPlayers.playerB.season,
                ]
                  .filter(Boolean)
                  .join(" • ")}
                rows={getPlayerRows(comparisonPlayers.playerB)}
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
          <p>{subtitle}</p>
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

export default ComparePlayers;
