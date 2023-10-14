import { useEffect, useState } from "react";
import axios from "axios";
import "./trendingMovies.css";
import {
  BsArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
const TrendingMovies = () => {
  const [Movie, setMovie] = useState([]);
  const [i, seti] = useState(1);
  const [l, setl] = useState(0);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/movies/genre/action`)
      .then((response) => {
        setMovie(response.data);
        setLoading(true);
      })
      .catch((error) => {});
  }, []);
  const handleRightArrow = () => {
    if (i == 0) {
      seti(1);
      setl(0);
    } else {
      seti(0);
      setl(1);
    }
    console.log(Movie);
  };

  if (!isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="trending-movies-container">
      <div className="trending-movies">
        <div className="contain-trending">
          <div className="trending-movie-2 left-poster">
            <img
              src={"http://localhost:5000/" + Movie[i].poster}
              alt=""
              srcSet=""
            />
          </div>
          <div className="trending-movie-1 trending-poster">
            <img src={"http://localhost:5000/" + Movie[l].poster} />
          </div>
          <div className="trending-movie-2 right-poster">
            <img
              src={"http://localhost:5000/" + Movie[i].poster}
              alt=""
              srcset=""
            />
          </div>
        </div>
        <div className="trending-module"></div>
      </div>

      <div className="arrow-btn">
        <div className="left-arrow">
          <BsArrowLeftCircleFill />
        </div>
        <div
          className="right-arrow"
          onClick={() => {
            handleRightArrow();
          }}
        >
          <BsFillArrowRightCircleFill />
        </div>
      </div>
    </div>
  );
};
export default TrendingMovies;
