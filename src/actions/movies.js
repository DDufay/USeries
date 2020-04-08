import {Movie} from "../models/Movie";
import {makeActionCreator} from "../helpers/helper";

// Popular movies
export const FETCH_POPULAR_MOVIES_REQUEST = 'FETCH_POPULAR_MOVIES_REQUEST';
export const FETCH_POPULAR_MOVIES_SUCCESS = 'FETCH_POPULAR_MOVIES_SUCCESS';

export const fetchPopularMoviesList = makeActionCreator(FETCH_POPULAR_MOVIES_REQUEST);
export const getPopularMoviesList = makeActionCreator(FETCH_POPULAR_MOVIES_SUCCESS, 'movies');

export const getPopularMovies = queryDebounce => dispatch => {
    dispatch(fetchPopularMoviesList());
    let url;
    if (queryDebounce) {
        url = `${process.env.REACT_APP_MOVIE_DB}search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR&query=${queryDebounce}`;
    } else {
        url = `${process.env.REACT_APP_MOVIE_DB}movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`;
    }

    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(getPopularMoviesList(json.results.map(Movie))))
    ;
};

// Lastest movies
export const FETCH_LATEST_MOVIES_REQUEST = 'FETCH_LATEST_MOVIES_REQUEST';
export const FETCH_LATEST_MOVIES_SUCCESS = 'FETCH_LATEST_MOVIES_SUCCESS';

export const fetchLatestMoviesList = makeActionCreator(FETCH_LATEST_MOVIES_REQUEST);
export const getLatestMoviesList = makeActionCreator(FETCH_LATEST_MOVIES_SUCCESS, 'movies');

export const getLatestMovies = () => dispatch => {
    dispatch(fetchLatestMoviesList());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR&page=1`)
        .then(response => response.json())
        .then(json => dispatch(getLatestMoviesList(json.results.map(Movie))))
    ;
};
