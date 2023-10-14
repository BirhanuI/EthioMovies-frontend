import { useEffect, useState } from "react";
import "./right_side_main.css";
import axios from "axios";
import { Link } from "react-router-dom";
const RightSideMain = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/movies`).then((response) => {
      setMovies(response.data);
      setLoading(true);
    });
  }, []);
  if (loading) {
    return (
      <div className="right-side-main">
        <div className="Related">
          <span>Popular Movies</span>
          {movies.map((movie) => (
            <div key={movie.id} className="movies-container">
              <div className="movie-poster">
                <Link to={"/movies/watch/" + movie._id}>
                  <img
                    src={"http://localhost:5000/" + movie.poster}
                    alt="Movie Poster"
                  />
                </Link>
              </div>
              <div className="movie-disc">
                <span id="title">{movie.title}</span>
                <p id="genre">
                  {movie.genres.map((genre) => (
                    <span>{`${genre}, `}</span>
                  ))}
                </p>
                <span className="rating">Rating: {movie._id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default RightSideMain;
