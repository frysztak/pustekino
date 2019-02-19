import { action } from "typesafe-actions";
import { SeancesActionTypes, Seances } from "./types";

export interface FetchParams {
  movieId: number;
  cinemaId: number;
}

export const fetchSeancesRequest = (params: FetchParams) =>
  action(SeancesActionTypes.FETCH_REQUEST, params);
export const fetchSeancesSuccess = (data: Seances) =>
  action(SeancesActionTypes.FETCH_SUCCESS, data);
export const fetchSeancesError = (message: string) =>
  action(SeancesActionTypes.FETCH_ERROR, message);
