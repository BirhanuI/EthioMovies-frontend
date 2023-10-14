import { useState, useEffect } from "react";
import axios from "axios";
import "./adminMovies.css";
const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filterd, setFilterd] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/movies/").then((response) => {
      setMovies(response.data);
      setFilterd(response.data);
    });
  }, []);
  const handleUpdate = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  const handleSearch = (query)=>{
const filteredResults = movies.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilterd(filteredResults);
  }
  return (
    <div className="admin-movies">
      <h1>Manage Movies</h1>
      <div className="search">
        <label htmlFor="search">Search:<input
          type="search"
          name="search"
          placeholder="by Title"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        /></label>
        
      </div>
      <table>
        <thead>
          <th>Title</th>
          <th>Genres</th>
          <th>Update</th>
          <th>Delete</th>
        </thead>
        {filterd.map((movie) => (
          <tr>
            <td>{movie.title}</td>
            <td>{movie.genres}</td>
            <td className="update">
              <button
                onClick={() => {
                  handleUpdate(movie._id);
                }}
              >
                Update
              </button>
            </td>
            <td className="delete">
              <button
                onClick={() => {
                  handleDelete(movie._id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminMovies;
