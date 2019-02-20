import { action } from "typesafe-actions";
import { SeancesActionTypes, Seances, Seance } from "./types";

export interface FetchSeancesParams {
  movieId: number;
  cinemaId: number;
}

export const fetchSeancesRequest = (params: FetchSeancesParams) =>
  action(SeancesActionTypes.FETCH_REQUEST, params);
export const fetchSeancesSuccess = (data: Seances) =>
  action(SeancesActionTypes.FETCH_SUCCESS, data);
export const fetchSeancesError = (message: string) =>
  action(SeancesActionTypes.FETCH_ERROR, message);

export const clearSeances = () => action(SeancesActionTypes.CLEAR);

export interface SingleSeanceError {
  seanceId: number;
  errorMessage: string;
}

export const fetchSeancesUpdates = (seances: Seances) =>
  action(SeancesActionTypes.FETCH_BULK_UPDATE_REQUEST, seances);
export const fetchSingleSeanceSuccess = (data: Seance) =>
  action(SeancesActionTypes.FETCH_SINGLE_SUCCESS, data);
export const fetchSingleSeanceError = (data: SingleSeanceError) =>
  action(SeancesActionTypes.FETCH_SINGLE_ERROR, data);
