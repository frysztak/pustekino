import { action } from "typesafe-actions";
import { MoviesActionTypes, Movie } from "./types";

export const fetchRequest = () => action(MoviesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Movie[]) => action(MoviesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(MoviesActionTypes.FETCH_ERROR, message)