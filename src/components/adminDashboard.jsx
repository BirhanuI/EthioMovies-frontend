import { Link, Route, Routes } from "react-router-dom";
import AddMovieForm from "./addMovie";
import AdminMovies from "./adminMovies";
import Report from "./report";
import Signup from "./signup";
import "./adminDashboard.css";
import ManageUser from "./manageUser";
const AdminDashboard = () => {
  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="dashboard-sidebar">
          <ul>
            <li>
              <Link to={""}>Dashboard</Link>
            </li>
            <li>
              <Link to={"movies"}>Show Movies</Link>
            </li>
            <li>
              <Link to={"addmovie"}>Add Movie</Link>
            </li>
            <li>
              <Link to={"users"}>Manage User</Link>
              <ul></ul>
            </li>
            <li><Link to={'addadmin'}>Add Admin Account</Link></li>
          </ul>
        </div>
        <div className="dashboard-body">
          <Routes>
            <Route path="/" element={<Report />} />
            <Route path="/addmovie" element={<AddMovieForm />} />
            <Route path="/movies" element={<AdminMovies />} />
            <Route path="/users" element={<ManageUser />} />
            <Route path="/addadmin" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
