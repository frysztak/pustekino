import {
  SeancesActionTypes,
  SeancesState,
  Seance,
  Popularity,
  Seances
} from "../seances/types";
import { Reducer } from "redux";

const initialSeances = {
  movieId: -1,
  cinemaId: -1,
  today: [],
  tomorrow: [],
  later: []
};

const initialPopularity = {
  movieId: -1,
  cinemaId: -1,
  loading: true,
  errorMessage: undefined,
  points: [],
  weekends: [[]]
};

const initialState: SeancesState = {
  loading: true,
  errorMessage: undefined,
  seances: initialSeances,
  popularity: initialPopularity
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

    case SeancesActionTypes.CLEAR: {
      return {
        loading: false,
        errorMessage: undefined,
        seances: initialSeances,
        popularity: initialPopularity
      };
    }

    case SeancesActionTypes.FETCH_BULK_UPDATE_REQUEST: {
      const updateSeances = (list: Seance[]) =>
        list.map(s => ({ ...s, loading: true }));
      const updateSeancesNested = (list: Seance[][]) =>
        list.map(l => updateSeances(l));

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: state.seances.later.map(l => updateSeances(l))
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
          later: state.seances.later.map(l => updateSeances(l))
        }
      };
    }

    case SeancesActionTypes.FETCH_SINGLE_ERROR: {
      const { seanceId, errorMessage } = action.payload;

      const updateSeances = (list: Seance[]) =>
        list.map(s =>
          s.multikinoId === seanceId
            ? { ...s, loading: false, errorMessage: errorMessage }
            : s
        );

      return {
        ...state,
        seances: {
          ...state.seances,
          today: updateSeances(state.seances.today),
          tomorrow: updateSeances(state.seances.tomorrow),
          later: state.seances.later.map(l => updateSeances(l))
        }
      };
    }

    case SeancesActionTypes.FETCH_POPULARITY_REQUEST: {
      return {
        ...state,
        popularity: {
          ...state.popularity,
          loading: true,
          errorMessage: undefined
        }
      };
    }

    case SeancesActionTypes.FETCH_POPULARITY_SUCCESS: {
      const { points, weekends } = action.payload;
      return {
        ...state,
        popularity: {
          ...state.popularity,
          loading: false,
          errorMessage: undefined,
          points: points,
          weekends: weekends
        }
      };
    }
    case SeancesActionTypes.FETCH_POPULARITY_ERROR: {
      const { movieId, cinemaId, errorMessage } = action.payload;
      return {
        ...state,
        popularity: {
          ...state.popularity,
          loading: false,
          errorMessage: errorMessage
        }
      };
    }

    default:
      return state;
  }
};

export { reducer as seancesReducer };
