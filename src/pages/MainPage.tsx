import React, { Component } from "react";
import Redux from "redux";
import { connect } from "react-redux";
import "./../scss/bootstrap.scss";
import Carousel from "react-bootstrap/Carousel";
import { MoviePreview } from "../components/MoviePreview";
import { NavBar } from "../components/NavBar";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { Movie } from "../redux/movies/types";
import { fetchRequest, selectMovie } from "../redux/movies/actions";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { MoviePoster } from "../components/MoviePoster";
import Row from "react-bootstrap/Row";

interface OwnProps {}

interface StateProps {
  loading: boolean;
  error: string | undefined;
  movies: Movie[];
}

interface DispatchProps {
  load: typeof fetchRequest;
  selectMovie: typeof selectMovie;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MainPage extends Component<Props> {
  componentDidMount() {
    if (this.props.movies.length === 0) {
      this.props.load();
    }
  }

  render() {
    const carousel = (
      <Carousel indicators={false}>
        {this.props.movies
          .filter(movie => movie.hero_url_desktop && movie.hero_url_mobile)
          .map((movie, i) => (
            <Carousel.Item key={i}>
              <MoviePreview movie={movie} />
            </Carousel.Item>
          ))}
      </Carousel>
    );

    const posters = (
      <Container>
        <Row>
          <h4 className="section-header">Pozostałe filmy</h4>
        </Row>
        <Row>
          {this.props.movies.map((movie, i) => (
            <Col key={i}>
              <MoviePoster
                movie={movie}
                clickHandler={this.props.selectMovie.bind(this)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    );

    return (
      <div>
        <NavBar />
        {this.props.loading ? <ProgressBar /> : { ...carousel }}
        <hr />
        {this.props.loading ? <ProgressBar /> : { ...posters }}
      </div>
    );
  }
}

const mapStateToProps = ({ movies }: AppState): StateProps => ({
  loading: movies.loading,
  error: movies.errorMessage,
  movies: movies.movies
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  load: () => dispatch(fetchRequest()),
  selectMovie: (movieid: number) => dispatch(selectMovie(movieid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
