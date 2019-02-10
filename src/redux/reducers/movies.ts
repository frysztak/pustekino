import { Movie } from "./Movie";
import { MovieAction, ADD_MOVIES, AddMoviesAction } from "./actions";

type MoviesState = {
  all: Movie[];
};

const initialState: MoviesState = {
  all: []
};

export default function(state = initialState, action: MovieAction) {
  switch (action.type) {
    case ADD_MOVIES:
      const { movies } = (<AddMoviesAction>action).payload;
      return { ...state, all: movies };
    default:
      return state;
  }
}
