import { SeancesActionTypes, SeancesState } from "../seances/types";
import { Reducer } from "redux";

const initialState: SeancesState = {
  loading: true,
  errorMessage: undefined,
  seances: {
    movieId: -1,
    cinemaId: -1,
    today: [],
    tomorrow: [],
    later: []
  }
};

const reducer: Reducer<SeancesState> = (state = initialState, action) => {
  switch (action.type) {
    case SeancesActionTypes.FETCH_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case SeancesActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        seances: action.payload
      };
    }
    case SeancesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errorMessage: action.payload };
    }
    default:
      return state;
  }
};

export { reducer as seancesReducer };
