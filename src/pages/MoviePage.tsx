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

interface StateProps {
  movie: Movie | undefined;
  movieHash: string;
}

interface DispatchProps {
  setCurrentMovie: (movieId: number) => void;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MoviePage extends React.Component<Props> {
  render() {
    if (!this.props.movie && this.props.movieHash) {
      const id = parseInt(this.props.movieHash.slice(1));
      this.props.setCurrentMovie(id);
    }

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

    const joinArray = (arr: string[]) =>
      arr.reduce((acc, cur) => `${acc}, ${cur}`);

    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col>
              <h2>{this.props.movie.title_pl}</h2>
            </Col>
          </Row>

          <Row>
            <Col lg={2} md={4}>
              <Image fluid src={this.props.movie.poster_large_url} />
            </Col>

            <Col lg={4} md={8}>
              {this.props.movie.genres.length ? (
                <h5>
                  <span>
                    <span className="text-muted">Gatunek: </span>
                    {joinArray(this.props.movie.genres)}
                  </span>
                </h5>
              ) : null}

              {this.props.movie.directors.length ? (
                <h5>
                  <span>
                    <span className="text-muted">Reżyser: </span>
                    {joinArray(this.props.movie.directors)}
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
                    {joinArray(this.props.movie.actors)}
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
            </Col>

            <Col lg={true}>{{ ...carousel }}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  movie: state.movies.currentMovie,
  movieHash: state.router.location.hash
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  setCurrentMovie: (movieId: number) => dispatch(selectMovie(movieId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
