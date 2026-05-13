function ComparePlayers({ onBack }) {
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
            Choose two soccer players and compare their stats side by side.
          </p>
        </div>

        <div className="filter-row">
          <div className="filter-box">League filter</div>
          <div className="filter-box">Season filter</div>
          <div className="filter-box">Player filters</div>
        </div>

        <div className="results-box">
          Player results and comparison cards will go here.
        </div>
      </section>
    </main>
  );
}

export default ComparePlayers;