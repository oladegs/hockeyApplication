// TeamDetail: Displays details for a single team with edit/delete.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import "../../styles/layout.css";
import "../../styles/teams.css";
import {
  ArrowLeftCircle,
  PeopleFill,
  PencilSquare,
  TrashFill,
} from "react-bootstrap-icons";

function TeamDetail() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/teams/${id}`)
      .then((res) => {
        const data = res.data || res;
        setTeam(data);
      })
      .catch(() => {
        setError("Team not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (!team) return;
    if (window.confirm("Are you sure you want to delete this team?")) {
      api.delete(`/teams/${team.teamId}`).then(() => {
        window.location.href = "/teams";
      });
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <Link to="/teams" className="btn btn-secondary mb-3">
        <ArrowLeftCircle className="me-1" size={18} /> Back to Teams
      </Link>

      {loading && <p>Loading team...</p>}
      {error && !loading && <p className="text-danger">{error}</p>}

      {team && !loading && (
        <div className="card shadow-sm p-4 team-card">
          <h3 className="fw-bold mb-3">
            <PeopleFill className="text-primary me-2" />
            {team.teamName}
          </h3>

          <div className="mb-3">
            <p>
              <strong>Team ID:</strong> {team.teamId}
            </p>
            <p>
              <strong>City:</strong> {team.teamCity}
            </p>
            <p>
              <strong>Founded:</strong> {team.teamFounded}
            </p>
            <p>
              <strong>Coach:</strong> {team.coachName}
            </p>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link
              to={`/teams/edit/${team.teamId}`}
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

export default TeamDetail;
