import axios from "axios";
import React, { useState } from "react";
const AddMovieForm = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = await axios({
      method: "post",
      url: "http://localhost:5000/api/v1/movies/upload/movie",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  const renderGenres = [
    "action",
    "comedy",
    "adventure",
    "drama",
    "romance",
    "crime",
    "scfi",
  ];
  const [cast,setCast] = useState([]);
  const [castCount,setCastCount] = useState(0);
  const [dirCount,setDirCount] = useState(0);
  const [director,setDirector] = useState([]);
  const handleAddCast = () => {
    const newElements = [...cast, <div key={castCount}><input type="text" name="cast" /></div>];
    setCast(newElements);
    setCastCount(castCount + 1);
  };
  return (
    <>
      <h1>Add Movie</h1>
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <label for="title">Title:</label>
          <div>
            <input type="text" name="title" />
          </div>
          <br />
          <label for="genres">
            Genres:
            {renderGenres.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" name="genre" />
                <span>{item}</span>
              </div>
            ))}
          </label>
          <br />
          <label for="plot">Plot:</label>
          <input type="text" name="plot" />
          <br />
          <label for="cast">Casts:</label>{cast}
          <input type="text" name="cast" /><button onClick={handleAddCast}>+</button>
         
          <br />
          <label for="directors">Directors:</label>
          <input type="text" name="directors" />
          <br />
          <label for="image">poster:</label>
          <input type="file" name="file" />
          <br />
          <label for="image">Movie:</label>
          <input type="file" name="file" />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default AddMovieForm;
