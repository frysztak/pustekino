import React from "react";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Movie } from "../redux/models/Movie";

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
    <div>
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
              <h1>{props.movie.title_pl}</h1>
            </Col>
          </Row>
          <Row className="d-none d-md-flex">
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

const MoviesCarousel = () => {
  return (
    <Carousel indicators={false}>
      <Carousel.Item>
        <Image
          className="w-100"
          src="https://multikino.pl/-/media/images/home-page/slider-hero-component/greenbook_slider-d.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://multikino.pl/-/media/images/home-page/slider-hero-component/lego2-slider-d.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://multikino.pl/-/media/images/home-page/slider-hero-component/kogel-slider2-d.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MoviesCarousel;
