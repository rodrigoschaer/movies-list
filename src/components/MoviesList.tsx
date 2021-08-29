import React from "react";

import Movie, { MoviesType } from "./Movie";
import classes from "./MoviesList.module.scss";

export type MoviesListType = {
  movies: Array<MoviesType>;
};

const MovieList = (props: MoviesListType) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
