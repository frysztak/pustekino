import { MoviesState, MoviesActionTypes } from "../movies/types";
import { Reducer } from "redux";

const initialState: MoviesState = {
  loading: true,
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
    case MoviesActionTypes.SET_CURRENT_MOVIE: {
      const movie = action.payload;
      return {
        ...state,
        currentMovie: movie
      };
    }
    default:
      return state;
  }
};

export { reducer as moviesReducer };
