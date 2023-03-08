import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/film");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content;

  switch (true) {
    case isLoading:
      content = <p>Loading...</p>;
      break;
    case !isLoading && error:
      content = <p>{error}</p>;
      break;
    case !isLoading && !error && movies.length > 0:
      content = <MoviesList movies={movies} />;
      break;
    case !isLoading && !error && movies.length === 0:
      content = <p>There are no movies to display</p>;
      break;
  }

  content = <p>There are no movies to display</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && error) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !error && movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
