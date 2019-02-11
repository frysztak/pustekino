import { Movie } from "../models/Movie";
import { AsyncAction } from "../actions/asyncAction";

export type MovieActionType = "LOAD_MOVIES";

export type ILoadMoviesStart = AsyncAction<MovieActionType>;
export type ILoadMoviesSuccess = AsyncAction<MovieActionType> & {
  payload: { movies: Movie[] };
};
export type ILoadMoviesFailure = AsyncAction<MovieActionType> & {
  payload: { error: string };
};

export type MovieAction =
  | ILoadMoviesStart
  | ILoadMoviesSuccess
  | ILoadMoviesFailure;

export function loadMovies() {
  return async (dispatch: any) => {
    dispatch({
      type: "LOAD_MOVIES",
      status: "start"
    });

    try {
      const resp = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies`);
      const json = await resp.json();
      const movies = json as Movie[];

      dispatch({
        type: "LOAD_MOVIES",
        status: "success",
        payload: { movies: movies }
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "LOAD_MOVIES",
        status: "failure",
        payload: { error: err }
      });
    }
  };
}

export type Action = MovieAction;
