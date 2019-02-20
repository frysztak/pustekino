import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { Movie, MoviesActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  setCurrentMovie,
  selectMovie
} from "./actions";
import { callApi } from "../../utils/api";
import { AppState } from "../store";
import { clearSeances, fetchSeancesRequest } from "../seances/actions";
import { AnyAction } from "redux";

const CinemaId = 18;
const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

function* handleFetch() {
  try {
    const resp = yield call(callApi, "get", baseUrl, "/movies");
    const movies = resp as Movie[];
    yield put(fetchSuccess(movies));

    const locationSelector = (state: AppState) => state.router.location;
    const location: ReturnType<typeof locationSelector> = yield select(
      locationSelector
    );

    if (location.pathname === "/movie" && location.hash) {
      const movieId = parseInt(location.hash.slice(1));
      yield put(selectMovie(movieId));
    }
  } catch (err) {
    yield put(fetchError(err));
  }
}

function* watchFetchRequest() {
  yield takeEvery(MoviesActionTypes.FETCH_REQUEST, handleFetch);
}

function* handleMovieSelected(action: AnyAction) {
  const movieId = action.payload as number;
  const movieSelector = (state: AppState) =>
    state.movies.movies.find(m => m.multikinoId === movieId);
  const movie: ReturnType<typeof movieSelector> = yield select(movieSelector);
  if (!movie) return;

  yield put(setCurrentMovie(movie));
  yield put(clearSeances());
  yield put(fetchSeancesRequest({ movieId: movieId, cinemaId: CinemaId }));
}

function* watchMovieSelected() {
  yield takeEvery(MoviesActionTypes.MOVIE_SELECTED, handleMovieSelected);
}

export default function* moviesSaga() {
  yield all([fork(watchFetchRequest), fork(watchMovieSelected)]);
}
