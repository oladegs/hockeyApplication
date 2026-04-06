// TeamPlayers: Shows one team's info and a table of its players.
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";

// Bootstrap Icons
import {
  ArrowLeftCircle,
  PersonLinesFill,
  PencilSquare,
  TrashFill,
  PlusCircle,
} from "react-bootstrap-icons";

function TeamPlayers() {
  const { id } = useParams(); // teamId from URL
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  const loadTeam = useCallback(async () => {
    try {
      const res = await api.get(`/teams/${id}`);
      setTeam(res.data || null);
    } catch (err) {
      setTeam(null);
      setError(err.message || "Unable to load team.");
    }
  }, [id]);

  const loadPlayers = useCallback(async () => {
    try {
      const res = await api.get(`/teams/${id}/player`);
      setPlayers(res.data || []);
    } catch (err) {
      setPlayers([]);
      setError(err.message || "Unable to load players for this team.");
    }
  }, [id]);

  useEffect(() => {
    setError("");
    loadTeam();
    loadPlayers();
  }, [loadPlayers, loadTeam]);

  const deletePlayer = async (playerId) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await api.delete(`/players/${playerId}`);
        loadPlayers();
      } catch (err) {
        window.alert(err.message || "Unable to delete player.");
      }
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card-surface" style={{ width: "100%", maxWidth: 800 }}>
        {/* BACK BUTTON */}
        <Link to="/teams" className="btn btn-secondary mb-3">
          <ArrowLeftCircle className="me-1" size={18} />
          Back to Teams
        </Link>

        {/* TEAM INFO */}
        {team && (
          <div className="mb-4">
            <h3 className="mb-2">
              <PersonLinesFill className="me-2" size={26} />
              {team.teamName}
            </h3>
            <p className="text-muted mb-1">
              <strong>Team ID:</strong> {team.teamId}
            </p>
            <p className="text-muted mb-1">
              <strong>City:</strong> {team.teamCity}
            </p>
            <p className="text-muted mb-1">
              <strong>Founded:</strong> {team.teamFounded}
            </p>
            <p className="text-muted">
              <strong>Coach:</strong> {team.coachName}
            </p>
          </div>
        )}

        {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}

        {/* PLAYERS HEADER + ADD BUTTON */}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h4 className="fw-bold mb-0">
            <PersonLinesFill className="me-2" size={24} />
            Players
          </h4>

          <Link
            to={`/players/add/${id}`}
            className="btn btn-success btn-sm d-inline-flex align-items-center btn-compact"
          >
            <PlusCircle className="me-1" size={14} />
            <span>Add Player</span>
          </Link>
        </div>

        {/* PLAYERS TABLE */}
        <div className="table-responsive mt-2">
          <table className="table table-hover table-bordered mb-0 align-middle">
            <thead className="table-dark">
              <tr>
                <th>Player ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Number</th>
                <th>Age</th>
                <th style={{ width: "190px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {players.length > 0 ? (
                players.map((player) => (
                  <tr key={player.playerId}>
                    <td>{player.playerId}</td>
                    <td className="fw-semibold">
                      {player.playerName ||
                        `${player.firstName} ${player.lastName}`}
                    </td>
                    <td>{player.position}</td>
                    <td>{player.jerseyNumber}</td>
                    <td>{player.age}</td>

                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to={`/players/edit/${player.playerId}`}
                          className="btn btn-warning btn-sm"
                        >
                          <PencilSquare className="me-1" />
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deletePlayer(player.playerId)}
                        >
                          <TrashFill className="me-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    <TrashFill className="text-danger me-2" />
                    No players found for this team.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeamPlayers;
