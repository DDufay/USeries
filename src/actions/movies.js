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

// Movie details
export const FETCH_MOVIE_DETAILS_REQUEST = 'FETCH_MOVIE_DETAILS_REQUEST';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';

export const fetchMovieDetails = makeActionCreator(FETCH_MOVIE_DETAILS_REQUEST);
export const getMovieDetails = makeActionCreator(FETCH_MOVIE_DETAILS_SUCCESS, 'movie');

export const getMovieDetailsById = movieId => dispatch => {
    dispatch(fetchMovieDetails());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => dispatch(getMovieDetails(Movie(json))))
};


// Movie video
export const FETCH_MOVIE_VIDEO_REQUEST = 'FETCH_MOVIE_VIDEO_REQUEST';
export const FETCH_MOVIE_VIDEO_SUCCESS = 'FETCH_MOVIE_VIDEO_SUCCESS';

export const fetchMovieVideo = makeActionCreator(FETCH_MOVIE_VIDEO_REQUEST);
export const getMovieVideo = makeActionCreator(FETCH_MOVIE_VIDEO_SUCCESS, 'video');

export const getMovieVideoById = serieId => dispatch => {
    dispatch(fetchMovieVideo());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}movie/${serieId}/videos?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => dispatch(getMovieVideo(json.results)))
};
