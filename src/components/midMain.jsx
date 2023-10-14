import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import "./mid_main.css";
const MidMain = () => {
  const { genre } = useParams();
  const [Movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/movies/genre/${genre || "action"}`)
      .then((response) => {
        setMovies(response.data);
        console.log(Movies);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [genre]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="mid-main">
      <span>Movies </span>
      <div className="image-container">
        {Movies.map((movie) => (
          <div key={movie._id} className="poster">
            <Link to={"/movies/watch/" + movie._id}>
              <img src={"http://localhost:5000/" + movie.poster} />
            </Link>
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MidMain;
