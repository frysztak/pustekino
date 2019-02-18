import React from "react";
import { fetchRequest } from "../redux/movies/actions";
import { connect } from "react-redux";
import "./../scss/loader.scss";

// I really wish I could use TypeScript here, but it doesn't seem to work
// (see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29991)

export function withLoader(WrappedComponent) {
  class WithLoader extends React.Component {
    componentDidMount() {
      if (this.props.movies.length === 0) {
        this.props.loadMovies();
      }
    }

    render() {
      if (this.props.loading) {
        return <div className="loader">Loading...</div>;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    movies: state.movies.movies,
    loading: state.movies.loading
  });

  const mapDispatchToProps = dispatch => ({
    loadMovies: () => dispatch(fetchRequest())
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithLoader);
}
