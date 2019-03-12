import { all, fork, call, put, takeEvery, select } from "redux-saga/effects";
import { callApi } from "../../utils/api";
import { fetchSuccess, fetchError } from "./actions";
import { CinemasActionTypes, Cinema } from "./types";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

export default function* cinemasSaga() {
  yield all([fork(watchFetchRequest)]);
}

function* watchFetchRequest() {
  yield takeEvery(CinemasActionTypes.FETCH_REQUEST, handleFetch);
}

function* handleFetch() {
  try {
    const resp = yield call(callApi, "get", baseUrl, "/cinemas");
    const cinemas = resp as Cinema[];
    yield put(fetchSuccess(cinemas));
  } catch (err) {
    yield put(fetchError(err));
  }
}
