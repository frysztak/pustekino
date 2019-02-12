import { MoviesState, MoviesActionTypes } from "../movies/types";
import { Reducer } from "redux";

const initialState: MoviesState = {
  loading: false,
  errorMessage: undefined,
  movies: [],
  currentMovie: undefined
};

const reducer: Reducer<MoviesState> = (state = initialState, action) => {
  switch (action.type) {
    case MoviesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case MoviesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, movies: action.payload };
    }
    case MoviesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    case MoviesActionTypes.SET_CURRENT: {
      return { ...state, currentMovie: action.payload };
    }
    default:
      return state;
  }
};

export { reducer as moviesReducer };
