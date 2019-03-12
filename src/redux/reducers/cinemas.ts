import { CinemasState, CinemasActionTypes } from "../cinemas/types";
import { Reducer } from "redux";

const initialState: CinemasState = {
  cinemas: [],
  currentCinema: undefined,
  errorMessage: undefined,
  loading: false
};

const reducer: Reducer<CinemasState> = (state = initialState, action) => {
  switch (action.type) {
    case CinemasActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case CinemasActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, cinemas: action.payload };
    }
    case CinemasActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    case CinemasActionTypes.CINEMA_SELECTED: {
      const cinemaId = action.payload;
      const cinema = state.cinemas.find(c => c.multikinoId === cinemaId);
      return {
        ...state,
        currentCinema: cinema
      };
    }
    default:
      return state;
  }
};

export { reducer as cinemasReducer };
