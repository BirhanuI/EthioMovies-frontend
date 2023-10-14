import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const VideoServer = ({ user }) => {
  const { id } = useParams();
  const videoRef = useRef(null);
  let isViewed = false;
  const [Movies, setMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);let i=0;
  const watchedTime = ()=>{
    setTimeout(() => {
      
      const video = videoRef.current;
      const intervalId = setInterval(() => {
        if(!video.paused){
        i++;
        if(i>=video.duration*0.05){
          if(!isViewed){
          axios.put("http://localhost:5000/api/v1/movies/views/"+id)
          isViewed=true;
        }
      }}
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }, 1000);
  }

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/v1/movies/${id}`,
    }).then((response) => {
      setMovies(response.data);
    });
    axios({
      method: "post",
      url: "http://localhost:5000/g2movies/user/comment/all",
      data: { id: id },
    }).then((response) => {
      setComments(response.data);
      setLoading(false);
    });
    watchedTime();
  }, [id]);

  const videoStyle = { width: "100%" };
  let movie = {};
  for (let i = 0; i < Movies.length; i++) {
    if (Movies[i]._id === id) {
      movie = Movies[i];
    }
  }
 
  if (!isLoading) {
    return (
      <div className="mid-main">
        <span>{movie.title}</span>
        <video
        ref={videoRef}
          style={videoStyle}
          src={"http://localhost:5000/" + movie.movie}
          autoPlay
          controls
        ></video>
        <div className="watching-discription">{movie.title}</div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default VideoServer;
