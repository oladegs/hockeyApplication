// export default AddTeam;
import React, { useState } from "react";
import api from "../../api";
import "../../styles/layout.css";
import { useNavigate } from "react-router-dom";

function AddTeam() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [team, setTeam] = useState({
    teamId: "",
    teamName: "",
    teamCity: "",
    teamFounded: "",
    coachName: "",
  });

  const handleChange = (e) =>
    setTeam({ ...team, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.post("/teams/add", team);
      navigate("/teams");
    } catch (err) {
      setError(err.message || "Unable to add team.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center fw-bold mb-4">Add New Team</h3>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* FORM ROW */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Team ID</label>
            <div className="col-9">
              <input
                name="teamId"
                type="number"
                className="form-control"
                placeholder="Enter Team ID"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Team Name
            </label>
            <div className="col-9">
              <input
                name="teamName"
                className="form-control"
                placeholder="Enter Team Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Team City
            </label>
            <div className="col-9">
              <input
                name="teamCity"
                className="form-control"
                placeholder="Enter City"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Founded Year
            </label>
            <div className="col-9">
              <input
                name="teamFounded"
                type="number"
                className="form-control"
                placeholder="Enter Founded Year"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Coach Name
            </label>
            <div className="col-9">
              <input
                name="coachName"
                className="form-control"
                placeholder="Enter Coach Name"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg px-5">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeam;
