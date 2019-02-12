import React from "react";
import Redux from "redux";
import { Movie } from "../redux/movies/types";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { connect } from "react-redux";

interface StateProps {
  movieId: number;
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MoviePage extends React.Component<Props> {
  render() {
    return <div>{this.props.movieId}</div>;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  movieId: parseInt(state.router.location.hash.replace("#", ""))
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
