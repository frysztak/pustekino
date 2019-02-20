import { Movie } from "../movies/types";

export interface Seances {
  movieId: number;
  cinemaId: number;
  today: Seance[];
  tomorrow: Seance[];
  later: Seance[];
}

export interface Seance {
  id: number;
  loading: boolean;
  errorMessage: string | undefined;
  multikinoId: number;
  date: Date;
  allSeatCount: number;
  takenSeatCount: number;
  seatAvailability: number;
}

export interface SeancesState {
  loading: boolean;
  errorMessage: string | undefined;
  seances: Seances;
}

export enum SeancesActionTypes {
  FETCH_REQUEST = "@@seances/FETCH_REQUEST",
  FETCH_SUCCESS = "@@seances/FETCH_SUCCESS",
  FETCH_ERROR = "@@seances/FETCH_ERROR",

  FETCH_BULK_UPDATE_REQUEST = "@@seances/FETCH_BULK_UPDATE_REQUEST",
  FETCH_SINGLE_SUCCESS = "@@seances/FETCH_SINGLE_SUCCESS",
  FETCH_SINGLE_ERROR = "@@seances/FETCH_SINGLE_ERROR"
}
