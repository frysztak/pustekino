import React, { Component } from "react";
import Redux from "redux";
import { connect } from "react-redux";
import "./scss/bootstrap.scss";
import Carousel from "react-bootstrap/Carousel";
import { MoviePreviewProps, MoviePreview } from "./components/MoviePreview";
import { loadMovies } from "./redux/reducers/actions";
import { NavBar } from "./components/NavBar";
import { Movie } from "./redux/models/Movie";
import { MoviesState } from "./redux/reducers/movies";
import { ConnectedReduxProps } from "./redux/store";
import { RouteComponentProps } from "react-router";

interface OwnProps {}

interface StateProps {
  loadStatus: string;
  movies: Movie[];
}

interface DispatchProps {
  load: () => void;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MainPage extends Component<Props> {
  componentDidMount() {
    console.log(this.props);
    if (!this.props.movies || this.props.movies.length === 0) {
      this.props.load();
    }
  }

  render() {
    return (
      <div>
        <NavBar />

        <Carousel indicators={false}>
          {this.props.movies
            ? this.props.movies
                .filter(
                  movie => movie.hero_url_desktop && movie.hero_url_mobile
                )
                .map((movie, i) => (
                  <Carousel.Item key={i}>
                    <MoviePreview movie={movie} />
                  </Carousel.Item>
                ))
            : null}
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state: MoviesState): StateProps => ({
  loadStatus: state.status,
  movies: state.all
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  load: () => loadMovies()(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
