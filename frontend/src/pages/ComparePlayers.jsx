import { useState } from "react";
import PlayerSelector from "../components/PlayerSelector";

function ComparePlayers({ onBack }) {
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);

  const canCompare = playerA && playerB;

  function handleCompare() {
    if (!canCompare) {
      return;
    }

    console.log("Compare players:", { playerA, playerB });
    alert("Player comparison page will be added next.");
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
          <PlayerSelector label="Player A" onSelect={setPlayerA} />
          <PlayerSelector label="Player B" onSelect={setPlayerB} />
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
      </section>
    </main>
  );
}

export default ComparePlayers;