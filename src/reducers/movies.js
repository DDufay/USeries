import {
    FETCH_POPULAR_MOVIES_REQUEST,
    FETCH_POPULAR_MOVIES_SUCCESS,
    FETCH_LATEST_MOVIES_REQUEST,
    FETCH_LATEST_MOVIES_SUCCESS,
} from "../actions/movies";
import {createReducer} from "../helpers/helper";

const initialState = {
    fetching: false,
    popularMovies: [],
    latestMovies: []
};

const actionHandlers = {
    [FETCH_POPULAR_MOVIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_POPULAR_MOVIES_SUCCESS]: (state, popularMovies) => ({ ...state, popularMovies, fetching: false }),
    [FETCH_LATEST_MOVIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_LATEST_MOVIES_SUCCESS]: (state, latestMovies) => ({ ...state, latestMovies, fetching: false }),
};

const local = state => state.movie;

export const getPopularMoviesEntities = state => (local(state).popularMovies.movies || []);
export const getlatestMoviesEntities = state => (local(state).latestMovies.movies || []);

export default createReducer(initialState, actionHandlers);
