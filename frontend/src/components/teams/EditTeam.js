
// export default EditTeam;
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/layout.css";

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState({
    teamId: "",
    teamName: "",
    teamCity: "",
    teamFounded: "",
    coachName: "",
  });

  useEffect(() => {
    api.get(`/teams/${id}`).then((res) => setTeam(res.data));
  }, [id]);

  const handleChange = (e) =>
    setTeam({ ...team, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/teams/${id}`, team).then(() => navigate("/teams"));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm p-4">

        <h3 className="text-center fw-bold mb-4">Edit Team</h3>

        <form onSubmit={handleSubmit}>

          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Team ID</label>
            <div className="col-9">
              <input
                name="teamId"
                className="form-control"
                value={team.teamId}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          {/* Team Name */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Team Name</label>
            <div className="col-9">
              <input
                name="teamName"
                className="form-control"
                value={team.teamName}
                onChange={handleChange}
                placeholder="Enter Team Name"
                required
              />
            </div>
          </div>

          {/* Team City */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Team City</label>
            <div className="col-9">
              <input
                name="teamCity"
                className="form-control"
                value={team.teamCity}
                onChange={handleChange}
                placeholder="Enter City"
                required
              />
            </div>
          </div>

          {/* Founded Year */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Founded Year</label>
            <div className="col-9">
              <input
                name="teamFounded"
                type="number"
                className="form-control"
                value={team.teamFounded}
                onChange={handleChange}
                placeholder="Enter Founded Year"
                required
              />
            </div>
          </div>

          {/* Coach Name */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Coach Name</label>
            <div className="col-9">
              <input
                name="coachName"
                className="form-control"
                value={team.coachName}
                onChange={handleChange}
                placeholder="Enter Coach Name"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg px-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTeam;
