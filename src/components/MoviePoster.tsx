import React from "react";
import { Movie } from "../redux/movies/types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { checkPropTypes } from "prop-types";

export interface MoviePosterProps {
  movie: Movie;
  clickHandler: (movieId: number) => void;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({
  movie,
  clickHandler
}) => (
  <Card className="text-center mt-3 bg-transparent" style={{ width: "15em" }}>
    <Card.Img variant="top" src={movie.poster_url} height="300rem" />
    <Card.Body>
      <Link
        to={{ pathname: "/movie", hash: movie.multikinoId.toString() }}
        className="card-title h5 stretched-link"
        onClick={() => clickHandler(movie.multikinoId)}
      >
        {movie.title_pl}
      </Link>
    </Card.Body>
  </Card>
);
