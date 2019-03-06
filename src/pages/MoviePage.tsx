import React from "react";
import Redux from "redux";
import { Movie } from "../redux/movies/types";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { NavBar } from "../components/NavBar";
import { selectMovie } from "../redux/movies/actions";
import Carousel from "react-bootstrap/Carousel";
import { fetchSeancesRequest } from "../redux/seances/actions";
import { Seances, PopularityPoint } from "../redux/seances/types";
import { SeanceGroup } from "../components/SeanceGroup";
import { PopularityChart } from "../components/PopularityChart";
import { AllSeances } from "../components/AllSeances";
import { Section } from "../components/Section";

interface StateProps {
  movie: Movie | undefined;
  movieHash: string;
  seances: Seances;
  seancesLoading: boolean;
  popularity: PopularityPoint[];
  weekends: Date[][];
  popularityLoading: boolean;
}

interface DispatchProps {
  setCurrentMovie: (movieId: number) => void;
  loadSeances: (movieId: number, cinemaId: number) => void;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MoviePage extends React.Component<Props> {
  private joinArray = (arr: string[]) =>
    arr.reduce((acc, cur) => `${acc}, ${cur}`);

  private bootstrapGrids = {
    lg: { span: 3, offset: 2 },
    xl: { span: 2, offset: 2 },
    md: { span: 3, offset: 1 },
    sm: { span: 2, offset: 0 }
  };

  render() {
    if (!this.props.movie) {
      return <div>Movie is not selected</div>;
    }

    const carousel = (
      <Carousel>
        {this.props.movie.preview_image_urls.map((url, i) => (
          <Carousel.Item key={i} className="movie-preview-constant-overlay">
            <Image src={url} fluid />
          </Carousel.Item>
        ))}
      </Carousel>
    );

    const movieInfo = (
      <div>
        {this.props.movie.genres.length ? (
          <h5>
            <span>
              <span className="text-muted">Gatunek: </span>
              {this.joinArray(this.props.movie.genres)}
            </span>
          </h5>
        ) : null}

        {this.props.movie.directors.length ? (
          <h5>
            <span>
              <span className="text-muted">Reżyser: </span>
              {this.joinArray(this.props.movie.directors)}
            </span>
          </h5>
        ) : null}

        {this.props.movie.country ? (
          <h5>
            <span>
              <span className="text-muted">Kraj: </span>
              {this.props.movie.country}
            </span>
          </h5>
        ) : null}

        {this.props.movie.actors.length ? (
          <h5>
            <span>
              <span className="text-muted">Aktorzy: </span>
              {this.joinArray(this.props.movie.actors)}
            </span>
          </h5>
        ) : null}

        {this.props.movie.runtime ? (
          <h5>
            <span>
              <span className="text-muted">Czas trwania: </span>
              <span>{this.props.movie.runtime}</span>
              <span> minut</span>
            </span>
          </h5>
        ) : null}

        <hr />
        <h5>{this.props.movie.description_pl}</h5>
      </div>
    );

    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 2 }}>
              <h2 className="my-3">{this.props.movie.title_pl}</h2>
            </Col>
          </Row>
          <Row>
            <Col {...this.bootstrapGrids} className="mb-5">
              <Image fluid src={this.props.movie.poster_large_url} />
            </Col>

            <Col lg={5} md={8} className="mb-3">
              {movieInfo}
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 8, offset: 2 }}>{{ ...carousel }}</Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }}>
              <Section name="Nadchodzące seanse" />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 2 }}>
              {this.props.seancesLoading ? (
                <div className="loader" />
              ) : (
                <AllSeances seances={this.props.seances} />
              )}
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 10, offset: 2 }} lg={{ span: 10, offset: 2 }}>
              <Section name="Historia zajętych miejsc" />
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 2 }}>
              {this.props.popularityLoading ? (
                <div className="loader" />
              ) : (
                <PopularityChart
                  data={this.props.popularity}
                  weekends={this.props.weekends}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  movie: state.movies.currentMovie,
  seances: state.seances.seances,
  seancesLoading: state.seances.loading,
  movieHash: state.router.location.hash,
  popularity: state.seances.popularity.points,
  weekends: state.seances.popularity.weekends,
  popularityLoading: state.seances.popularity.loading
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  setCurrentMovie: (movieId: number) => dispatch(selectMovie(movieId)),
  loadSeances: (movieId: number, cinemaId: number) =>
    dispatch(fetchSeancesRequest({ movieId: movieId, cinemaId: cinemaId }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
