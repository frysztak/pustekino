import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Seance, SeancesActionTypes, Seances, Popularity } from "./types";
import {
  fetchSeancesError,
  fetchSeancesSuccess,
  fetchSingleSeanceSuccess,
  fetchSingleSeanceError,
  fetchSeancesUpdates,
  fetchPopularityError,
  fetchPopularitySuccess,
  fetchPopularityRequest
} from "./actions";
import { callApi } from "../../utils/api";
import { AnyAction } from "redux";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

function* handleFetch({ payload }: AnyAction) {
  const { movieId, cinemaId } = payload;
  try {
    const resp = yield call(
      callApi,
      "get",
      baseUrl,
      `/seances/${movieId}/at/${cinemaId}`
    );
    const data = resp as Seances;
    yield put(fetchSeancesSuccess(data));
    yield put(fetchSeancesUpdates(data));
    yield put(fetchPopularityRequest({ movieId: movieId, cinemaId: cinemaId }));
  } catch (err) {
    yield put(fetchSeancesError(err));
  }
}

function* handleSingleFetchUpdate(seanceId: number) {
  try {
    const resp = yield call(callApi, "get", baseUrl, `/seance/${seanceId}`);
    const data = resp as Seance;
    data.loading = false;
    yield put(fetchSingleSeanceSuccess(data));
  } catch (err) {
    yield put(
      fetchSingleSeanceError({ seanceId: seanceId, errorMessage: err.message })
    );
  }
}

function* handleFetchBulkUpdate({ payload }: AnyAction) {
  const s = payload as Seances;
  const flatten = (arr: any[]) => Array.prototype.concat(...arr);
  const forks = [...s.today, ...s.tomorrow, ...flatten(s.later)].map(seance =>
    fork(handleSingleFetchUpdate, seance.multikinoId)
  );

  yield all(forks);
}

function* watchFetchRequest() {
  yield takeEvery(SeancesActionTypes.FETCH_REQUEST, handleFetch);
}

function* watchFetchSingleSeanceRequest() {
  yield takeEvery(
    SeancesActionTypes.FETCH_BULK_UPDATE_REQUEST,
    handleFetchBulkUpdate
  );
}

function* watchFetchPopularity() {
  yield takeEvery(
    SeancesActionTypes.FETCH_POPULARITY_REQUEST,
    handleFetchPopularity
  );
}

function* handleFetchPopularity({ payload }: AnyAction) {
  const { movieId, cinemaId } = payload;
  try {
    const resp = yield call(
      callApi,
      "get",
      baseUrl,
      `/movie/${movieId}/popularity/at/${cinemaId}`
    );
    const popularity = resp as Popularity;
    yield put(fetchPopularitySuccess(popularity));
  } catch (err) {
    console.log(err.message);
    yield put(
      fetchPopularityError({
        movieId: movieId,
        cinemaId: cinemaId,
        errorMessage: err.message
      })
    );
  }
}

export default function* seancesSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchSingleSeanceRequest),
    fork(watchFetchPopularity)
  ]);
}
