import React, { useState, useEffect } from "react";

const MovieSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieSearchResults, setMovieSearchResults] = useState("");
  // const [imdbID, setImdbID] = useState("");
  //   const [reviewData, setReviewData] = useState("");
  //   const [review, setReview] = useState("");

  const handleFetch = () => {
    fetch(`https://www.omdbapi.com/?apikey=dde3f76d&t=${searchTerm}&plot=full/`)
      .then((res) => res.json())
      .then((jsonData) => {
        setMovieSearchResults(jsonData);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      <input
        placeholder='Search for Movie Here'
        onInput={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFetch}>Search</button>
      {movieSearchResults && (
        <div>
          <img
          // src={
          // `https://image.tmdb.org/t/p/w500/8NUM43rtQSt0chumXGJPvnYb01I.jpg/8NUM43rtQSt0chumXGJPvnYb01I.jpg`
          // src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          //base options with whatever width...https://image.tmdb.org/t/p/w500 ... fetch ... photoPath, setPhotoPath (null or "")(`https://image.tmdb.org/t/p/w500${data.poster_path}`)...json response
          />
          {/* <img src={movieSearchResults.Poster} alt="movie poster" /> */}
          <h2>Title</h2>
          <h6>{movieSearchResults.Title}</h6>
          <h4>Plot</h4>
          <h6>{movieSearchResults.Plot}</h6>
          <h4>IMDb Rating</h4>
          <h6>{movieSearchResults.imdbRating}</h6>
          <h4>Released</h4>
          <h6>{movieSearchResults.Runtime}</h6>
          <h4>Director</h4>
          <h6>{movieSearchResults.Director}</h6>
          <h4>Actors</h4>
          <h6>{movieSearchResults.Actors}</h6>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
