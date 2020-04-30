import {
    FETCH_LATEST_SERIES_REQUEST,
    FETCH_LATEST_SERIES_SUCCESS,
    FETCH_POPULAR_SERIES_REQUEST,
    FETCH_POPULAR_SERIES_SUCCESS,
    FETCH_SERIE_DETAILS_REQUEST,
    FETCH_SERIE_DETAILS_SUCCESS,
    FETCH_SERIE_SEASONS_REQUEST,
    FETCH_SERIE_SEASONS_SUCCESS,
    FETCH_SERIE_VIDEO_REQUEST,
    FETCH_SERIE_VIDEO_SUCCESS,
    SEARCH_SERIES_REQUEST,
    SEARCH_SERIES_SUCCESS,
    RESET_SEARCH_SERIES_SUCCESS
} from "../actions/series";
import {createReducer} from "../helpers/helper";

const initialState = {
    fetching: false,
    popularSeries: [],
    latestSeries: [],
    serie: {},
    searchedSeries: []
};

const actionHandlers = {
    [FETCH_POPULAR_SERIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_POPULAR_SERIES_SUCCESS]: (state, popularSeries) => ({ ...state, popularSeries, fetching: false }),
    [FETCH_LATEST_SERIES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_LATEST_SERIES_SUCCESS]: (state, latestSeries) => ({ ...state, latestSeries, fetching: false }),
    [FETCH_SERIE_DETAILS_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_SERIE_DETAILS_SUCCESS]: (state, serie) => ({ ...state, serie: { ...state.serie, ...serie.serie }, fetching: false }),
    [FETCH_SERIE_VIDEO_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_SERIE_VIDEO_SUCCESS]: (state, video) => ({ ...state, serie: { ...state.serie, video: { ...video.video } }, fetching: false }),
    [FETCH_SERIE_SEASONS_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_SERIE_SEASONS_SUCCESS]: (state, season) => ({ ...state, serie: { ...state.serie, seasons: [ ...state.serie.seasons.filter(s => s.season_number !== season.season.season_number), { ...state.serie.seasons.find(s => s.season_number === season.season.season_number), episodes: season.season.episodes }].sort((a, b) => a.season_number - b.season_number) }, fetching: false }),
    [SEARCH_SERIES_REQUEST]: state => ({...state, fetching: true}),
    [SEARCH_SERIES_SUCCESS]: (state, searchedSeries) => ({...state, searchedSeries, fetching: false}),
    [RESET_SEARCH_SERIES_SUCCESS]: (state) => ({...state, searchedSeries: [], fetching: false}),
};

const local = state => state.serie;

export const getPopularSeriesEntities = state => (local(state).popularSeries.series || []);
export const getlatestSeriesEntities = state => (local(state).latestSeries.series || []);
export const getSerieDetails = state => (local(state).serie || {});
export const getSearchedSeries = state => (local(state).searchedSeries.series || []);

export default createReducer(initialState, actionHandlers);
