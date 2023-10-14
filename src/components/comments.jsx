import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comments = ({ user, Movies }) => {
  const { id } = useParams();
  let movie = {};
  for (let i = 0; i < Movies.length; i++) {
    if (Movies[i]._id === id) {
      movie = Movies[i];
    }
  }
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:5000/g2movies/user/comment/all",
      data: { id: id },
    }).then((response) => {
      setComments(response.data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      movieid: movie._id,
      movie: movie.title,
      comment: e.target.comment.value,
      user: user.name,
      userid: user.id,
      date: Date(),
    };
    const { data: comment } = await axios({
      method: "post",
      url: "http://localhost:5000/g2movies/user/comment",
      data: data,
    });
    const newComments = [...comments, data];
    // setComments({ comments: newComments });
    console.log(newComments);
    e.target.comment.value = "";
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h2>Comments</h2>
      <div className="comment-section">

      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index}>
            <div className="comment">
              <div className="comment-header">
                <h3 className="comment-author">{comment.user}</h3>
                <span className="comment-date">{comment.date}</span>
              </div>
              <div className="comment-body">
                <p>{comment.comment}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <form className="comment-form" onSubmit={handleSubmit}>
        <h3>Leave a Comment</h3>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" name="comment"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
        </div>
    </div>
  );
};

export default Comments;
