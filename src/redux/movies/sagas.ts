import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { Movie, MoviesActionTypes } from "./types";
import { fetchError, fetchSuccess } from "./actions";
import { callApi } from "../../utils/api";

function* handleFetch() {
  try {
    const resp = yield call(
      callApi,
      "get",
      process.env.REACT_APP_API_BASE_URL as string,
      "/movies"
    );
    const movies = resp as Movie[];
    yield put(fetchSuccess(movies));
  } catch (err) {
    yield put(fetchError(err));
  }
}

function* watchFetchRequest() {
  yield takeEvery(MoviesActionTypes.FETCH_REQUEST, handleFetch);
}

export default function* moviesSaga() {
  yield all([fork(watchFetchRequest)]);
}
