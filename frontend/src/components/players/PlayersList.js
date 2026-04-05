// PlayersList: Shows all players as vertical cards with filters and actions.
import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../styles/layout.css";
import "../../styles/players.css";
import { Link } from "react-router-dom";

// React-Bootstrap-Icons
import {
  PlusCircle,
  PencilSquare,
  TrashFill,
  PersonFill,
  EyeFill,
} from "react-bootstrap-icons";

function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [searchId, setSearchId] = useState("");

  const loadPlayers = () => {
    api.get("/players").then((res) => setPlayers(res.data));
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const deletePlayer = (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      api.delete(`/players/${id}`).then(() => loadPlayers());
    }
  };

  const handleViewById = async () => {
    if (!searchId) {
      loadPlayers();
      return;
    }
    try {
      const res = await api.get(`/players/${searchId}`);
      const player = res.data || res;
      setPlayers(player ? [player] : []);
    } catch (err) {
      window.alert("Player not found");
      setPlayers([]);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">
          <PersonFill className="me-2" size={30} />
          Players
        </h2>

        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center me-3">
            <input
              type="number"
              className="form-control form-control-sm me-2"
              placeholder="Player ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ width: "130px" }}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm me-1"
              onClick={handleViewById}
            >
              View by ID
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setSearchId("");
                loadPlayers();
              }}
            >
              Reset
            </button>
          </div>

          <Link to="/players/add" className="btn btn-primary shadow-sm">
            <PlusCircle className="me-1" size={18} />
            Add Player
          </Link>
        </div>
      </div>

      {/* Player Cards Grid */}
      {players.length > 0 ? (
        <div className="players-grid">
          {players.map((p) => (
            <div key={p.playerId} className="player-card">
              <div>
                <div className="player-card-header">
                  <div className="player-card-title">
                    {p.playerName || `${p.firstName} ${p.lastName}`}
                  </div>
                  <span className="player-card-meta">ID: {p.playerId}</span>
                </div>

                <div className="player-card-meta">
                  <div>
                    <strong>Position:</strong> {p.position}
                  </div>
                  <div>
                    <strong>Jersey #:</strong> {p.jerseyNumber}
                  </div>
                  <div>
                    <strong>Age:</strong> {p.age}
                  </div>
                  <div>
                    <strong>Team ID:</strong> {p.teamId}
                  </div>
                </div>
              </div>

              <div className="player-card-actions">
                <Link
                  to={`/players/${p.playerId}`}
                  className="btn btn-info btn-sm"
                >
                  <EyeFill className="me-1" /> View
                </Link>

                <Link
                  to={`/players/edit/${p.playerId}`}
                  className="btn btn-warning btn-sm"
                >
                  <PencilSquare className="me-1" /> Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePlayer(p.playerId)}
                >
                  <TrashFill className="me-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <TrashFill className="text-danger me-2" size={25} />
          No players found.
        </div>
      )}
    </div>
  );
}

export default PlayersList;
