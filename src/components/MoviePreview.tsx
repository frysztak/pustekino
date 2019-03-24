import React from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Movie } from "../redux/movies/types";

export interface MoviePreviewProps {
  movie: Movie;
}

export const MoviePreview: React.FC<MoviePreviewProps> = props => {
  const sections = [];
  for (const genre of props.movie.genres) {
    sections.push(genre);
    sections.push("|");
  }
  sections.push(`${props.movie.runtime} minut`);

  return (
    <div className="movie-preview">
      <div className="w-100 d-none d-md-block movie-preview-overlay">
        <Image className="w-100" src={props.movie.hero_url_desktop} />
      </div>
      <div className="w-100 d-block d-md-none movie-preview-overlay">
        <Image className="w-100" src={props.movie.hero_url_mobile} />
      </div>

      <Carousel.Caption>
        <Container className="text-left">
          <Row>
            <Col>
              <div className="movie-preview-title">{props.movie.title_pl}</div>
            </Col>
          </Row>
          <Row className="d-none d-md-flex movie-preview-genres">
            {sections.map((section, i) => (
              <Col md="auto" key={i}>
                {section}
              </Col>
            ))}
          </Row>
        </Container>
      </Carousel.Caption>
    </div>
  );
};
