import React from "react";
import { Movie } from "../redux/movies/types";
import Card from "react-bootstrap/Card";

export interface MoviePosterProps {
  movie: Movie;
}

export const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => (
  <Card className="text-center mt-3 bg-transparent" style={{ width: "15em" }}>
    <Card.Img variant="top" src={movie.poster_url} height="300rem" />
    <Card.Body>
      <Card.Title>{movie.title_pl}</Card.Title>
    </Card.Body>
  </Card>
);
