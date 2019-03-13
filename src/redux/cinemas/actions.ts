import { action } from "typesafe-actions";
import { CinemasActionTypes } from "./types";
import { CinemaResponse } from "./sagas";

export const fetchRequest = () => action(CinemasActionTypes.FETCH_REQUEST);
export const fetchSuccess = (data: CinemaResponse) =>
  action(CinemasActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) =>
  action(CinemasActionTypes.FETCH_ERROR, message);

export const selectCinema = (cinemaId: number) =>
  action(CinemasActionTypes.CINEMA_SELECTED, cinemaId);
