import { useEffect, useState } from "react";
import { getTeams } from "../api/footballApi";
import { leagues, seasons } from "../data/filterOptions";

function TeamSelector({ label, onSelect }) {
  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState("");

  const [teams, setTeams] = useState([]);
  const [activeTeamId, setActiveTeamId] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedLeague = leagues.find(
    (league) => league.id === Number(leagueId)
  );

  const activeTeam = teams.find(
    (item) => item.team.id === Number(activeTeamId)
  );

  useEffect(() => {
    async function loadTeams() {
      if (!leagueId || !season || selectedTeam) {
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setTeams([]);
        setActiveTeamId("");

        const data = await getTeams(leagueId, season);

        setTeams(data.response || []);
      } catch (err) {
        console.error(err);
        setError("Could not load teams.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTeams();
  }, [leagueId, season, selectedTeam]);

  function handleSelectTeam() {
    if (!activeTeam || !selectedLeague) {
      return;
    }

    const teamChoice = {
      id: activeTeam.team.id,
      name: activeTeam.team.name,
      logo: activeTeam.team.logo,
      country: activeTeam.team.country,
      founded: activeTeam.team.founded,
      venueName: activeTeam.venue?.name,
      venueCity: activeTeam.venue?.city,
      venueCapacity: activeTeam.venue?.capacity,
      leagueId,
      leagueName: selectedLeague.name,
      season,
    };

    setSelectedTeam(teamChoice);
    onSelect(teamChoice);
  }

  function handleClearTeam() {
    setSelectedTeam(null);
    setActiveTeamId("");
    onSelect(null);
  }

  return (
    <section className="selector-card">
      <div className="selector-card-header">
        <h3>{label}</h3>

        {selectedTeam ? (
          <button className="small-button outline-button" onClick={handleClearTeam}>
            Clear
          </button>
        ) : (
          <button
            className="small-button"
            onClick={handleSelectTeam}
            disabled={!activeTeam}
          >
            Use Team
          </button>
        )}
      </div>

      <div className="selector-filters">
        <label className="filter-field">
          <span>League</span>
          <select
            value={leagueId}
            onChange={(event) => setLeagueId(event.target.value)}
            disabled={Boolean(selectedTeam)}
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
            disabled={Boolean(selectedTeam)}
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
        {selectedTeam ? (
          <div className="selected-item">
            <img src={selectedTeam.logo} alt="" />
            <div>
              <strong>{selectedTeam.name}</strong>
              <p>
                {selectedTeam.leagueName} • {selectedTeam.season}
              </p>
            </div>
          </div>
        ) : isLoading ? (
          <p>Loading teams...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : teams.length ? (
          <div className="option-list">
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
    </section>
  );
}

export default TeamSelector;