// export default AddPlayer;
import React, { useState } from "react";
import api from "../../api";
import "../../styles/layout.css";
import { useNavigate, useParams } from "react-router-dom";

function AddPlayer() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [error, setError] = useState("");
  const [player, setPlayer] = useState({
    playerId: "",
    firstName: "",
    lastName: "",
    position: "",
    jerseyNumber: "",
    age: "",
    teamId: teamId || "",
  });

  const handleChange = (e) =>
    setPlayer({ ...player, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await api.post("/players/add", player);
      navigate("/players");
    } catch (err) {
      setError(err.message || "Unable to add player.");
    }
  };

  return (
    <div className="container">
      <h2>Add New Player</h2>

      <form onSubmit={handleSubmit} className="vertical-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          name="playerId"
          type="number"
          placeholder="Player ID"
          onChange={handleChange}
          required
        />
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="position"
          placeholder="Position"
          onChange={handleChange}
          required
        />
        <input
          name="jerseyNumber"
          type="number"
          placeholder="Jersey Number"
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          required
        />
        <input
          name="teamId"
          type="number"
          placeholder="Team ID"
          value={player.teamId}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddPlayer;
