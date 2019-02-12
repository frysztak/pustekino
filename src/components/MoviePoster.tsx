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
      <a href="#" className="card-title h5 stretched-link">
        {movie.title_pl}
      </a>
    </Card.Body>
  </Card>
);
