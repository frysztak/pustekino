import { all, fork, call, put, takeEvery, select } from "redux-saga/effects";
import { callApi } from "../../utils/api";
import { fetchSuccess, fetchError } from "./actions";
import { CinemasActionTypes, Cinema } from "./types";
import { AnyAction } from "redux";
import { push } from "connected-react-router";

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

export interface CinemaResponse {
  cinemas: Cinema[];
  map: any; // use any, since we don't actually care about the type
}

export default function* cinemasSaga() {
  yield all([fork(watchFetchRequest), fork(watchCinemaSelected)]);
}

function* watchFetchRequest() {
  yield takeEvery(CinemasActionTypes.FETCH_REQUEST, handleFetch);
}

function* handleFetch() {
  try {
    const resp = yield call(callApi, "get", baseUrl, "/cinemas");
    const cinemas = resp as CinemaResponse;
    yield put(fetchSuccess(cinemas));
  } catch (err) {
    console.log(err);
    yield put(fetchError(err));
  }
}

function* watchCinemaSelected() {
  yield takeEvery(CinemasActionTypes.CINEMA_SELECTED, handleCinemaSelected);
}

function* handleCinemaSelected(action: AnyAction) {
  const cinemaId = action.payload as number;
  localStorage.setItem("cinemaId", cinemaId.toString());
  yield put(push("/"));
}
