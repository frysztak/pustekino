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

    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col xs={6}>
              <Image src={this.props.movie.hero_url} fluid />
            </Col>
            <Col xs={6}>
              <h1>{this.props.movie.title_pl}</h1>
            </Col>
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
