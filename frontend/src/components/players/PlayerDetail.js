// PlayerDetail: Displays details for a single player with edit/delete.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import "../../styles/layout.css";
import "../../styles/players.css";
import {
  ArrowLeftCircle,
  PersonFill,
  PencilSquare,
  TrashFill,
} from "react-bootstrap-icons";

function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/players/${id}`)
      .then((res) => {
        const data = res.data || res;
        setPlayer(data);
      })
      .catch(() => {
        setError("Player not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (!player) return;
    if (window.confirm("Are you sure you want to delete this player?")) {
      api.delete(`/players/${player.playerId}`).then(() => {
        window.location.href = "/players";
      });
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <Link to="/players" className="btn btn-secondary mb-3">
        <ArrowLeftCircle className="me-1" size={18} /> Back to Players
      </Link>

      {loading && <p>Loading player...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}

      {player && !loading && (
        <div className="card shadow-sm p-4 player-card">
          <h3 className="fw-bold mb-3">
            <PersonFill className="text-primary me-2" />
            {player.playerName || `${player.firstName} ${player.lastName}`}
          </h3>

          <div className="mb-3">
            <p>
              <strong>Player ID:</strong> {player.playerId}
            </p>
            <p>
              <strong>Position:</strong> {player.position}
            </p>
            <p>
              <strong>Jersey #:</strong> {player.jerseyNumber}
            </p>
            <p>
              <strong>Age:</strong> {player.age}
            </p>
            <p>
              <strong>Team ID:</strong> {player.teamId}
            </p>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link
              to={`/players/edit/${player.playerId}`}
              className="btn btn-warning btn-sm"
            >
              <PencilSquare className="me-1" /> Edit
            </Link>

            <button className="btn btn-danger btn-sm" onClick={handleDelete}>
              <TrashFill className="me-1" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerDetail;
