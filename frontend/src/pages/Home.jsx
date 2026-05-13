import { useEffect, useState } from "react";

function Home({ onCompareTeams, onComparePlayers }) {
  const [backendStatus, setBackendStatus] = useState("Checking backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.message);
      })
      .catch(() => {
        setBackendStatus("Backend is not connected");
      });
  }, []);

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
          <button onClick={onCompareTeams}>Compare Teams</button>
          <button className="outline-button" onClick={onComparePlayers}>
            Compare Players
          </button>
        </div>

        <p className="backend-status">{backendStatus}</p>
      </section>
    </main>
  );
}

export default Home;