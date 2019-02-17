export interface Movie {
  id: number;
  multikinoId: number;
  title_pl: string;
  title_eng: string;
  currently_shown: boolean;
  poster_url: string;
  description_pl: string;
  genres: string[];
  runtime: number;
  hero_url_desktop: string;
  hero_url_mobile: string;
  preview_image_urls: string[];
}

export interface MoviesState {
  loading: boolean;
  errorMessage: string | undefined;
  movies: Movie[];
  currentMovie: Movie | undefined;
}

export enum MoviesActionTypes {
  FETCH_REQUEST = "@@movies/FETCH_REQUEST",
  FETCH_SUCCESS = "@@movies/FETCH_SUCCESS",
  FETCH_ERROR = "@@movies/FETCH_ERROR",

  MOVIE_SELECTED = "@@movies/MOVIE_SELECTED"
}
