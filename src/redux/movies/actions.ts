import { action } from "typesafe-actions";
import { MoviesActionTypes, Movie } from "./types";

export const fetchRequest = () => action(MoviesActionTypes.FETCH_REQUEST);
export const fetchSuccess = (data: Movie[]) =>
  action(MoviesActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) =>
  action(MoviesActionTypes.FETCH_ERROR, message);

export const selectMovie = (movieId: number) =>
  action(MoviesActionTypes.MOVIE_SELECTED, movieId);
export const setCurrentMovie = (movie: Movie) =>
  action(MoviesActionTypes.SET_CURRENT_MOVIE, movie);
