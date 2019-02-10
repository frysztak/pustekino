import { Movie } from "./Movie";

export const LOAD_MOVIES = "LOAD_MOVIES";
export const ADD_MOVIES = "ADD_MOVIES";

export interface LoadMoviesAction {
  type: string;
  payload: {};
}

export interface AddMoviesAction {
  type: string;
  payload: { movies: Movie[] };
}

export type MovieAction = LoadMoviesAction | AddMoviesAction;

export const loadMovies = (): LoadMoviesAction => ({
  type: LOAD_MOVIES,
  payload: {}
});

export const addMovies = (movies: Movie[]): AddMoviesAction => ({
  type: ADD_MOVIES,
  payload: { movies }
});

export type Action = MovieAction;
