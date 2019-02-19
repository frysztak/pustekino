import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Seance, SeancesActionTypes, Seances } from "./types";
import { fetchSeancesError, fetchSeancesSuccess, FetchParams } from "./actions";
import { callApi } from "../../utils/api";
import { AnyAction } from "redux";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

function* handleFetch({ payload }: AnyAction) {
  console.log(payload);
  try {
    const resp = yield call(
      callApi,
      "get",
      baseUrl,
      `/seances/${payload.movieId}/at/${payload.cinemaId}`
    );
    const data = resp as Seances;
    yield put(fetchSeancesSuccess(data));
  } catch (err) {
    yield put(fetchSeancesError(err));
  }
}

function* watchFetchRequest() {
  yield takeEvery(SeancesActionTypes.FETCH_REQUEST, handleFetch);
}

export default function* seancesSaga() {
  yield all([fork(watchFetchRequest)]);
}
