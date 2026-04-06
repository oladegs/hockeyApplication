// export default EditPlayer;
import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../styles/layout.css";
import { useNavigate, useParams } from "react-router-dom";

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [player, setPlayer] = useState({
    playerId: "",
    firstName: "",
    lastName: "",
    position: "",
    jerseyNumber: "",
    age: "",
    teamId: "",
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        setError("");
        const res = await api.get(`/players/${id}`);
        setPlayer(res.data || player);
      } catch (err) {
        setError(err.message || "Unable to load player.");
      }
    };

    fetchPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.put(`/players/${id}`, player);
      navigate("/players");
    } catch (err) {
      setError(err.message || "Unable to update player.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="text-center fw-bold mb-4">Edit Player</h3>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Player ID */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Player ID
            </label>
            <div className="col-9">
              <input
                name="playerId"
                type="number"
                className="form-control"
                value={player.playerId}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          {/* First Name */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              First Name
            </label>
            <div className="col-9">
              <input
                name="firstName"
                className="form-control"
                value={player.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">
              Last Name
            </label>
            <div className="col-9">
              <input
                name="lastName"
                className="form-control"
                value={player.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Position */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Position</label>
            <div className="col-9">
              <input
                name="position"
                className="form-control"
                value={player.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Jersey Number */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Jersey #</label>
            <div className="col-9">
              <input
                name="jerseyNumber"
                type="number"
                className="form-control"
                value={player.jerseyNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Age</label>
            <div className="col-9">
              <input
                name="age"
                type="number"
                className="form-control"
                value={player.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Team ID */}
          <div className="row mb-3 align-items-center">
            <label className="col-3 col-form-label fw-semibold">Team ID</label>
            <div className="col-9">
              <input
                name="teamId"
                type="number"
                className="form-control"
                value={player.teamId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg px-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPlayer;
