import "./App.css";

function App() {
  return (
    <main className="app">
      <section className="home-card">
        <p className="eyebrow">Soccer Analytics</p>

        <h1>
          Stat<span>Side</span>
        </h1>

        <div className="accent-line"></div>

        <p className="subtitle">
          Compare soccer teams and players using real football data.
        </p>

        <div className="button-row">
          <button>Compare Teams</button>
          <button className="outline-button">Compare Players</button>
        </div>
      </section>
    </main>
  );
}

export default App;