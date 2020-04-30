import {
    FETCH_POPULAR_MOVIES_REQUEST,
    FETCH_POPULAR_MOVIES_SUCCESS,
    FETCH_LATEST_MOVIES_REQUEST,
    FETCH_LATEST_MOVIES_SUCCESS,
    FETCH_MOVIE_DETAILS_REQUEST,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_VIDEO_REQUEST,
    FETCH_MOVIE_VIDEO_SUCCESS,
    SEARCH_MOVIES_REQUEST,
    SEARCH_MOVIES_SUCCESS,
    RESET_SEARCH_MOVIES_SUCCESS
} from "../actions/movies";
import {createReducer} from "../helpers/helper";

const initialState = {
    fetching: false,
    popularMovies: [],
    latestMovies: [],
    searchedMovies: [],
    movie: {}
};

const actionHandlers = {
    [FETCH_POPULAR_MOVIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_POPULAR_MOVIES_SUCCESS]: (state, popularMovies) => ({ ...state, popularMovies, fetching: false }),
    [FETCH_LATEST_MOVIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_LATEST_MOVIES_SUCCESS]: (state, latestMovies) => ({ ...state, latestMovies, fetching: false }),
    [FETCH_MOVIE_DETAILS_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_MOVIE_DETAILS_SUCCESS]: (state, movie) => ({ ...state, movie: movie.movie, fetching: false }),
    [FETCH_MOVIE_VIDEO_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_MOVIE_VIDEO_SUCCESS]: (state, video) => ({ ...state, movie: { ...state.movie, video: { ...video.video } }, fetching: false }),
    [SEARCH_MOVIES_REQUEST]: state => ({...state, fetching: true}),
    [SEARCH_MOVIES_SUCCESS]: (state, searchedMovies) => ({...state, searchedMovies, fetching: false}),
    [RESET_SEARCH_MOVIES_SUCCESS]: (state) => ({...state, searchedMovies: [], fetching: false}),
};

const local = state => state.movie;

export const getPopularMoviesEntities = state => (local(state).popularMovies.movies || []);
export const getlatestMoviesEntities = state => (local(state).latestMovies.movies || []);
export const getMovieDetail = state => (local(state).movie || []);
export const getSearchedMovies = state => (local(state).searchedMovies.movies || []);

export default createReducer(initialState, actionHandlers);
