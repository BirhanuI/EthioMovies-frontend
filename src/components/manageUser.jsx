import { useState, useEffect } from "react";
import axios from "axios";
import "./adminMovies.css";
const ManageUser = () => {
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState(user);
  useEffect(() => {
    axios
      .get("http://localhost:5000/g2movies/user/getuser")
      .then((response) => {
        setUser(response.data);
        setUsers(response.data);
      });
  }, []);
  const handleBlock = (id) => {
    console.log(id);
  };
  const handleSearch = (query) => {
    const filteredResults = user.filter((item) =>
      item.firstname.toLowerCase().includes(query.toLowerCase())
    );
    setUsers(filteredResults);
  };
  return (
    <div className="admin-movies">
      <h1>Manage User</h1>
      <div className="search">
        <label htmlFor="search">Search:<input
          type="search"
          name="search"
          placeholder="by FirstName"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        /></label>
        
      </div>

      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>isSub</th>
          <th>isAdm</th>
          <th>Block</th>
        </thead>
        {users.map((user) => (
          <tr key={user.email}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.isSubscribed.toString()}</td>
            <td>{user.isAdmin.toString()}</td>
            <td className="delete">
              <button
                onClick={() => {
                  handleBlock(user._id);
                }}
              >
                Block
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ManageUser;
