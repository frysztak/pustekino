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

    const genres = this.props.movie.genres.reduce(
      (acc, cur) => `${acc}, ${cur}`
    );
    const directors = this.props.movie.directors.reduce(
      (acc, cur) => `${acc}, ${cur}`
    );
    const actors = this.props.movie.actors.reduce(
      (acc, cur) => `${acc}, ${cur}`
    );

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
            <Col xs={3}>
              <Image width="350rem" src={this.props.movie.poster_large_url} />
            </Col>

            <Col xs={3}>
              <h5>
                <span>
                  <span className="text-muted">Gatunek: </span>
                  {genres}
                </span>
              </h5>

              <h5>
                <span>
                  <span className="text-muted">Reżyser: </span>
                  {directors}
                </span>
              </h5>

              <h5>
                <span>
                  <span className="text-muted">Kraj: </span>
                  {this.props.movie.country}
                </span>
              </h5>

              <h5>
                <span>
                  <span className="text-muted">Aktorzy: </span>
                  {actors}
                </span>
              </h5>

              <hr />
              <h5>{this.props.movie.description_pl}</h5>
            </Col>
          </Row>

          <Row>
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