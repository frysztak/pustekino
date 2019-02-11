import { Movie } from "../models/Movie";
import { MovieAction, ILoadMoviesSuccess, ILoadMoviesFailure } from "./actions";
import { handleAsyncAction } from "../actions/asyncAction";

export type MoviesState = {
  status: string;
  errorMessage: string | null;
  all: Movie[];
};

const initialState: MoviesState = {
  status: "",
  errorMessage: null,
  all: []
};

export default function(state = initialState, action: MovieAction) {
  switch (action.type) {
    case "LOAD_MOVIES":
      return handleAsyncAction(state, action, {
        start: _ => ({ ...state, status: action.status }),

        success: _ => ({
          ...state,
          status: action.status,
          all: (<ILoadMoviesSuccess>action).payload.movies
        }),

        failure: _ => ({
          ...state,
          status: action.status,
          errorMessage: (<ILoadMoviesFailure>action).payload.error
        })
      });
    default:
      return state;
  }
}
