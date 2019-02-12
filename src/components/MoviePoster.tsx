import React from "react";
import { Movie } from "../redux/movies/types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export interface MoviePosterProps {
  movie: Movie;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => (
  <Card className="text-center mt-3 bg-transparent" style={{ width: "15em" }}>
    <Card.Img variant="top" src={movie.poster_url} height="300rem" />
    <Card.Body>
      <Link
        to={{ pathname: "/movie", hash: movie.multikinoId.toString() }}
        className="card-title h5 stretched-link"
      >
        {movie.title_pl}
      </Link>
    </Card.Body>
  </Card>
);
