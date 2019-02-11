import React, { Component } from "react";
import { connect } from "react-redux";
import "./scss/bootstrap.scss";
import Carousel from "react-bootstrap/Carousel";
import { MoviePreviewProps, MoviePreview } from "./components/MoviePreview";
import { loadMovies } from "./redux/reducers/actions";
import { NavBar } from "./components/NavBar";
import { Movie } from "./redux/models/Movie";

type Props = {
  loadStatus: string;
  errorMessage: string;
  movies: Movie[];
};

class MainPage extends Component {
  componentDidMount() {
    (this.props as any).load();
  }

  render() {
    const movies: MoviePreviewProps[] = [
      {
        movieName: "Lego Movie",
        runtime: 107,
        genres: ["Familijny", "Animowany", "Przygodowy"],
        desktopImage:
          "https://multikino.pl/-/media/images/home-page/slider-hero-component/lego2-slider-d.jpg",
        mobileImage:
          "https://multikino.pl/-/media/images/home-page/slider-hero-component/lego2-slider-m.jpg"
      }
    ];

    return (
      <div>
        <NavBar />

        <Carousel indicators={false}>
          {movies.map((movie, i) => (
            <Carousel.Item key={i}>
              <MoviePreview {...movie} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loadStatus: state.movies.status
});

const mapDispatchToProps = {
  load: loadMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
