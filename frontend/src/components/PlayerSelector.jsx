import { useEffect, useState } from "react";
import { getPlayers, getTeams } from "../api/footballApi";
import { leagues, seasons } from "../data/filterOptions";

function PlayerSelector({ label, onSelect }) {
  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState("");

  const [teams, setTeams] = useState([]);
  const [activeTeamId, setActiveTeamId] = useState("");

  const [players, setPlayers] = useState([]);
  const [activePlayerId, setActivePlayerId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);
  const [error, setError] = useState("");

  const selectedLeague = leagues.find(
    (league) => league.id === Number(leagueId)
  );

  const activeTeam = teams.find(
    (item) => item.team.id === Number(activeTeamId)
  );

  const activePlayer = players.find(
    (item) => item.player.id === Number(activePlayerId)
  );

  useEffect(() => {
    async function loadTeams() {
      if (!leagueId || !season || selectedPlayer) {
        return;
      }

      try {
        setIsLoadingTeams(true);
        setError("");
        setTeams([]);
        setPlayers([]);
        setActiveTeamId("");
        setActivePlayerId("");

        const data = await getTeams(leagueId, season);

        setTeams(data.response || []);
      } catch (err) {
        console.error(err);
        setError("Could not load teams.");
      } finally {
        setIsLoadingTeams(false);
      }
    }

    loadTeams();
  }, [leagueId, season, selectedPlayer]);

  useEffect(() => {
    async function loadPlayers() {
      if (!leagueId || !season || !activeTeamId || selectedPlayer) {
        return;
      }

      try {
        setIsLoadingPlayers(true);
        setError("");
        setPlayers([]);
        setActivePlayerId("");

        const data = await getPlayers({
          league: leagueId,
          season,
          team: activeTeamId,
        });

        setPlayers(data.response || []);
      } catch (err) {
        console.error(err);
        setError("Could not load players.");
      } finally {
        setIsLoadingPlayers(false);
      }
    }

    loadPlayers();
  }, [leagueId, season, activeTeamId, selectedPlayer]);

  function handleSelectPlayer() {
    if (!activePlayer || !activeTeam || !selectedLeague) {
      return;
    }

    const playerChoice = {
      id: activePlayer.player.id,
      name: activePlayer.player.name,
      photo: activePlayer.player.photo,
      teamId: activeTeam.team.id,
      teamName: activeTeam.team.name,
      teamLogo: activeTeam.team.logo,
      leagueId,
      leagueName: selectedLeague.name,
      season,
    };

    setSelectedPlayer(playerChoice);
    onSelect(playerChoice);
  }

  function handleClearPlayer() {
    setSelectedPlayer(null);
    setActivePlayerId("");
    onSelect(null);
  }

  return (
    <section className="selector-card">
      <div className="selector-card-header">
        <h3>{label}</h3>

        {selectedPlayer ? (
          <button className="small-button outline-button" onClick={handleClearPlayer}>
            Clear
          </button>
        ) : (
          <button
            className="small-button"
            onClick={handleSelectPlayer}
            disabled={!activePlayer}
          >
            Use Player
          </button>
        )}
      </div>

      <div className="selector-filters">
        <label className="filter-field">
          <span>League</span>
          <select
            value={leagueId}
            onChange={(event) => setLeagueId(event.target.value)}
            disabled={Boolean(selectedPlayer)}
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
            disabled={Boolean(selectedPlayer)}
          >
            <option value="">Select season</option>
            {seasons.map((seasonOption) => (
              <option key={seasonOption} value={seasonOption}>
                {seasonOption}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="selection-box">
        {selectedPlayer ? (
          <div className="selected-item">
            <img src={selectedPlayer.photo} alt="" />
            <div>
              <strong>{selectedPlayer.name}</strong>
              <p>
                {selectedPlayer.teamName} • {selectedPlayer.leagueName} •{" "}
                {selectedPlayer.season}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="selector-section">
              <p className="selector-section-title">1. Choose a team</p>

              {isLoadingTeams ? (
                <p>Loading teams...</p>
              ) : teams.length ? (
                <div className="option-list compact">
                  {teams.map((item) => (
                    <button
                      key={item.team.id}
                      className={
                        Number(activeTeamId) === item.team.id
                          ? "option-button active"
                          : "option-button"
                      }
                      onClick={() => setActiveTeamId(String(item.team.id))}
                    >
                      <img src={item.team.logo} alt="" />
                      <span>{item.team.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p>Select a league and season to load teams.</p>
              )}
            </div>

            <div className="selector-section">
              <p className="selector-section-title">2. Choose a player</p>

              {isLoadingPlayers ? (
                <p>Loading players...</p>
              ) : players.length ? (
                <div className="option-list compact">
                  {players.map((item) => (
                    <button
                      key={item.player.id}
                      className={
                        Number(activePlayerId) === item.player.id
                          ? "option-button active"
                          : "option-button"
                      }
                      onClick={() => setActivePlayerId(String(item.player.id))}
                    >
                      <img src={item.player.photo} alt="" />
                      <span>{item.player.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p>Select a team to load players.</p>
              )}
            </div>

            {error && <p className="error-message">{error}</p>}
          </>
        )}
      </div>
    </section>
  );
}

export default PlayerSelector;