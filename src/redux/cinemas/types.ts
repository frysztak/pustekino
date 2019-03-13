export interface Cinema {
  id: number;
  chain: string;
  name: string;
  multikinoId: number;
  latitude: number;
  longitude: number;
}
export interface CinemasState {
  cinemas: Cinema[];
  currentCinema: Cinema | undefined;
  map: any | undefined;
  loading: boolean;
  errorMessage: string | undefined;
}

export enum CinemasActionTypes {
  FETCH_REQUEST = "@@cinemas/FETCH_REQUEST",
  FETCH_SUCCESS = "@@cinemas/FETCH_SUCCESS",
  FETCH_ERROR = "@@cinemas/FETCH_ERROR",

  CINEMA_SELECTED = "@@cinemas/CINEMA_SELECTED"
}
