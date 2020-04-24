import {makeActionCreator} from "../helpers/helper";
import {Serie} from "../models/Serie";
import {SerieDetail} from "../models/SerieDetail";

// Popular series
export const FETCH_POPULAR_SERIES_REQUEST = 'FETCH_POPULAR_SERIES_REQUEST';
export const FETCH_POPULAR_SERIES_SUCCESS = 'FETCH_POPULAR_SERIES_SUCCESS';

export const fetchPopularSeriesList = makeActionCreator(FETCH_POPULAR_SERIES_REQUEST);
export const getPopularSeriesList = makeActionCreator(FETCH_POPULAR_SERIES_SUCCESS, 'series');

export const getPopularSeries = () => dispatch => {
    dispatch(fetchPopularSeriesList());
    const url = `${process.env.REACT_APP_MOVIE_DB}tv/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR&page=1`;

    return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(getPopularSeriesList(json.results.map(Serie))))
    ;
};

// Lastest SERIES
export const FETCH_LATEST_SERIES_REQUEST = 'FETCH_LATEST_SERIES_REQUEST';
export const FETCH_LATEST_SERIES_SUCCESS = 'FETCH_LATEST_SERIES_SUCCESS';

export const fetchLatestSeriesList = makeActionCreator(FETCH_LATEST_SERIES_REQUEST);
export const getLatestSeriesList = makeActionCreator(FETCH_LATEST_SERIES_SUCCESS, 'series');

export const getLatestSeries = () => dispatch => {
    dispatch(fetchLatestSeriesList());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}tv/on_the_air?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR&page=1`)
        .then(response => response.json())
        .then(json => dispatch(getLatestSeriesList(json.results.map(Serie))))
    ;
};

// Serie details
export const FETCH_SERIE_DETAILS_REQUEST = 'FETCH_SERIE_DETAILS_REQUEST';
export const FETCH_SERIE_DETAILS_SUCCESS = 'FETCH_SERIE_DETAILS_SUCCESS';

export const fetchSerieDetails = makeActionCreator(FETCH_SERIE_DETAILS_REQUEST);
export const getSerieDetails = makeActionCreator(FETCH_SERIE_DETAILS_SUCCESS, 'serie');

export const getSerieDetailsById = serieId => dispatch => {
    dispatch(fetchSerieDetails());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}tv/${serieId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => dispatch(getSerieDetails(SerieDetail(json))))
};

// Serie seasons Detail
export const FETCH_SERIE_SEASONS_REQUEST = 'FETCH_SERIE_SEASONS_REQUEST';
export const FETCH_SERIE_SEASONS_SUCCESS = 'FETCH_SERIE_SEASONS_SUCCESS';

export const fetchSerieSeasons = makeActionCreator(FETCH_SERIE_SEASONS_REQUEST);
export const getSerieSeasons = makeActionCreator(FETCH_SERIE_SEASONS_SUCCESS, 'season');

export const getSerieSeasonById = (serieId, seasonId) => dispatch => {
    dispatch(fetchSerieSeasons());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}tv/${serieId}/season/${seasonId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => dispatch(getSerieSeasons(json)))
};

// Serie video
export const FETCH_SERIE_VIDEO_REQUEST = 'FETCH_SERIE_VIDEO_REQUEST';
export const FETCH_SERIE_VIDEO_SUCCESS = 'FETCH_SERIE_VIDEO_SUCCESS';

export const fetchSerieVideo = makeActionCreator(FETCH_SERIE_VIDEO_REQUEST);
export const getSerieVideo = makeActionCreator(FETCH_SERIE_VIDEO_SUCCESS, 'video');

export const getSerieVideoBySerieId = serieId => dispatch => {
    dispatch(fetchSerieVideo());

    return fetch(`${process.env.REACT_APP_MOVIE_DB}tv/${serieId}/season/1/videos?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .then(json => dispatch(getSerieVideo(json.results)))
};

// Search serie

export const SEARCH_SERIES_REQUEST = 'SEARCH_SERIES_REQUEST';
export const SEARCH_SERIES_SUCCESS = 'SEARCH_SERIES_SUCCESS';

export const searchSeriesList = makeActionCreator(SEARCH_SERIES_REQUEST);
export const getSearchSeriesList = makeActionCreator(SEARCH_SERIES_SUCCESS, 'series');
export const searchSeries = queryDebounce => dispatch => {
    dispatch(searchSeriesList());

    if (queryDebounce) {
        return fetch(`${process.env.REACT_APP_MOVIE_DB}search/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=fr-FR&query=${queryDebounce}`)
            .then(response => response.json())
            .then(json => dispatch(getSearchSeriesList(json.results.map(Serie))))
            ;
    }
};

export const RESET_SEARCH_SERIES_SUCCESS = 'RESET_SEARCH_SERIES_SUCCESS';

export const resetSearchSeries = makeActionCreator(RESET_SEARCH_SERIES_SUCCESS, 'movies');
export const resetResearch = () => dispatch => {
    dispatch(resetSearchSeries([]));

};
