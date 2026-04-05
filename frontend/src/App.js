import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HouseDoorFill } from "react-bootstrap-icons";
import TeamsList from "./components/teams/TeamsList";
import AddTeam from "./components/teams/AddTeam";
import EditTeam from "./components/teams/EditTeam";
import TeamDetail from "./components/teams/TeamDetail";
import PlayersList from "./components/players/PlayersList";
import AddPlayer from "./components/players/AddPlayer";
import EditPlayer from "./components/players/EditPlayer";
import PlayerDetail from "./components/players/PlayerDetail";
import TeamPlayers from "./components/teams/TeamPlayers";
import "./styles/layout.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">
          <HouseDoorFill style={{ marginRight: 4 }} /> Home
        </Link>
        <Link to="/teams">Teams</Link>
        <Link to="/players">Players</Link>
      </nav>

      <Routes>
        {/* Landing page with Teams and Players cards */}
        <Route
          path="/"
          element={
            <div className="home-container">
              <div className="home-grid">
                <div className="home-card">
                  <h2>Teams</h2>
                  <p>Manage teams, view details, and see team players.</p>
                  <Link to="/teams" className="btn btn-primary mt-2">
                    Go to Teams
                  </Link>
                </div>

                <div className="home-card">
                  <h2>Players</h2>
                  <p>Browse players, edit details, and assign to teams.</p>
                  <Link to="/players" className="btn btn-primary mt-2">
                    Go to Players
                  </Link>
                </div>
              </div>
            </div>
          }
        />

        {/* Teams */}
        <Route path="/teams" element={<TeamsList />} />
        <Route path="/teams/add" element={<AddTeam />} />
        <Route path="/teams/edit/:id" element={<EditTeam />} />
        <Route path="/teams/:id" element={<TeamDetail />} />
        <Route path="/teams/:id/players" element={<TeamPlayers />} />

        {/* Players */}
        <Route path="/players" element={<PlayersList />} />
        <Route path="/players/add" element={<AddPlayer />} />
        <Route path="/players/add/:teamId" element={<AddPlayer />} />
        <Route path="/players/edit/:id" element={<EditPlayer />} />
        <Route path="/players/:id" element={<PlayerDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
