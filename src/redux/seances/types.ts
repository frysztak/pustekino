import { Movie } from "../movies/types";

export type NumericDate = number;

export interface Seances {
  movieId: number;
  cinemaId: number;
  today: Seance[];
  tomorrow: Seance[];
  later: Seance[][];
}

interface LoadingState {
  loading: boolean;
  errorMessage: string | undefined;
}

export interface Seance {
  id: number;
  loading: boolean;
  errorMessage: string | undefined;
  multikinoId: number;
  date: NumericDate;
  allSeatCount: number;
  takenSeatCount: number;
  seatAvailability: number;
}

export type PopularityState = Popularity & LoadingState;

export interface SeancesState {
  loading: boolean;
  errorMessage: string | undefined;
  seances: Seances;
  popularity: PopularityState;
}

export interface Popularity {
  movieId: number;
  cinemaId: number;
  points: PopularityPoint[];
  weekends: NumericDate[][];
}

export interface PopularityPoint {
  date: NumericDate;
  seatAvailability: number;
}

export enum SeancesActionTypes {
  FETCH_REQUEST = "@@seances/FETCH_REQUEST",
  FETCH_SUCCESS = "@@seances/FETCH_SUCCESS",
  FETCH_ERROR = "@@seances/FETCH_ERROR",
  CLEAR = "@@seances/CLEAR",

  FETCH_BULK_UPDATE_REQUEST = "@@seances/FETCH_BULK_UPDATE_REQUEST",
  FETCH_SINGLE_SUCCESS = "@@seances/FETCH_SINGLE_SUCCESS",
  FETCH_SINGLE_ERROR = "@@seances/FETCH_SINGLE_ERROR",

  FETCH_POPULARITY_REQUEST = "@@seances/FETCH_POPULARITY_REQUEST",
  FETCH_POPULARITY_SUCCESS = "@@seances/FETCH_POPULARITY_SUCCESS",
  FETCH_POPULARITY_ERROR = "@@seances/FETCH_POPULARITY_ERROR"
}
