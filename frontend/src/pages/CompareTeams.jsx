import { useState } from "react";
import TeamSelector from "../components/TeamSelector";

function CompareTeams({ onBack }) {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);

  const canCompare = teamA && teamB;

  function handleCompare() {
    if (!canCompare) {
      return;
    }

    console.log("Compare teams:", { teamA, teamB });
    alert("Team comparison page will be added next.");
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
          <TeamSelector label="Team A" onSelect={setTeamA} />
          <TeamSelector label="Team B" onSelect={setTeamB} />
        </div>

        <div className="compare-action-row">
          <button
            className="compare-button"
            disabled={!canCompare}
            onClick={handleCompare}
          >
            Compare Teams
          </button>
        </div>
      </section>
    </main>
  );
}

export default CompareTeams;