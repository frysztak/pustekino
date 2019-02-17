import React from "react";
import Redux from "redux";
import { Movie } from "../redux/movies/types";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { connect } from "react-redux";

interface StateProps {
  movie: Movie | undefined;
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MoviePage extends React.Component<Props> {
  render() {
    if (!this.props.movie) {
      return <div>Movie is not selected</div>;
    }
    return <div>{this.props.movie.title_pl}</div>;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  movie: state.movies.currentMovie
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
