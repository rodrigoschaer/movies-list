import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.scss";

type MovieJson = {
  episode_id: string;
  title: string;
  opening_crawl: string;
  release: string;
};

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData: MovieJson) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release,
        };
      });
      setMovies(transformedMovies);
    } catch (e) {
      setError((e as Error).message);
    }
    setIsLoading(false);
  };

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
