import { SeancesActionTypes, SeancesState, Seance } from "../seances/types";
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

    case SeancesActionTypes.FETCH_BULK_UPDATE_REQUEST: {
      const { seances } = action.payload;
      const updateSeances = (list: Seance[]) =>
        list.map(s => ({ ...s, loading: true }));

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: updateSeances(state.seances.later)
        }
      };
    }

    case SeancesActionTypes.FETCH_SINGLE_SUCCESS: {
      const seance = action.payload as Seance;

      const updateSeances = (list: Seance[]) =>
        list.map(s =>
          s.multikinoId === seance.multikinoId
            ? { ...seance, loading: false }
            : s
        );

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: updateSeances(state.seances.later)
        }
      };
    }

    case SeancesActionTypes.FETCH_SINGLE_ERROR: {
      const { seance } = action.payload;

      const updateSeances = (list: Seance[]) =>
        list.map(s =>
          s.multikinoId === seance.multikinoId
            ? { ...seance, loading: false }
            : s
        );

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: updateSeances(state.seances.later)
        }
      };
    }

    case SeancesActionTypes.FETCH_SINGLE_ERROR: {
      const { seanceError } = action.payload;

      const updateSeances = (list: Seance[]) =>
        list.map(s =>
          s.multikinoId === seanceError.seanceId
            ? { ...s, loading: false, errorMessage: seanceError.errorMessage }
            : s
        );

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: updateSeances(state.seances.later)
        }
      };
    }

    default:
      return state;
  }
};

export { reducer as seancesReducer };
