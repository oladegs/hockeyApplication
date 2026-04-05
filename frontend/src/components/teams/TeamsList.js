// TeamsList: Lists all teams in a vertical card grid with actions.
import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../styles/layout.css";
import "../../styles/teams.css";
import { Link } from "react-router-dom";

// Import Bootstrap Icons as React components
import {
  EyeFill,
  PencilSquare,
  TrashFill,
  PlusCircle,
  PeopleFill,
} from "react-bootstrap-icons";

function TeamsList() {
  const [teams, setTeams] = useState([]);

  const loadTeams = () => {
    api.get("/teams").then((res) => setTeams(res.data));
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const deleteTeam = (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      api.delete(`/teams/${id}`).then(() => loadTeams());
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">
          <PeopleFill className="me-2" size={30} />
          Team Management
        </h2>

        <Link to="/teams/add" className="btn btn-primary shadow-sm">
          <PlusCircle className="me-1" />
          Add Team
        </Link>
      </div>

      {/* Teams Grid */}
      {teams.length > 0 ? (
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team.teamId} className="team-card">
              <div>
                <div className="team-card-header">
                  <div className="team-card-title">{team.teamName}</div>
                  <span className="team-card-meta">ID: {team.teamId}</span>
                </div>

                <div className="team-card-meta">
                  <div>
                    <strong>City:</strong> {team.teamCity}
                  </div>
                  <div>
                    <strong>Founded:</strong> {team.teamFounded}
                  </div>
                  <div>
                    <strong>Coach:</strong> {team.coachName}
                  </div>
                </div>
              </div>

              <div className="team-card-actions">
                <Link
                  to={`/teams/${team.teamId}`}
                  className="btn btn-info btn-sm"
                >
                  <EyeFill className="me-1" />
                  View
                </Link>

                <Link
                  to={`/teams/${team.teamId}/players`}
                  className="btn btn-secondary btn-sm"
                >
                  Players
                </Link>

                <Link
                  to={`/teams/edit/${team.teamId}`}
                  className="btn btn-warning btn-sm"
                >
                  <PencilSquare className="me-1" />
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTeam(team.teamId)}
                >
                  <TrashFill className="me-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-3">
          <TrashFill className="text-danger me-2" />
          No teams found.
        </div>
      )}
    </div>
  );
}

export default TeamsList;
