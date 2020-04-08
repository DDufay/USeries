import {makeActionCreator} from "../helpers/helper";
import {deleteEntity, getEntity} from "../api/Database";
import {Collections} from "../api/Collections";

export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';

export const DELETE_FAVORITES_SUCCESS = 'DELETE_FAVORITES_SUCCESS';

export const fetchFavoritesList = makeActionCreator(FETCH_FAVORITES_REQUEST);
export const getFavoritesList = makeActionCreator(FETCH_FAVORITES_SUCCESS, 'favorites');

export const deleteFavoriteMovie = makeActionCreator(DELETE_FAVORITES_SUCCESS, 'favorites');

export const getFavorites = () => dispatch => {
    dispatch(fetchFavoritesList());
    getEntity(Collections.favorites)
        .then(response => {
            const favorites = response.docs.map(doc => doc.data());
            dispatch(getFavoritesList(favorites));
        })
        .catch(error => console.error(error))
    ;
};


export const deleteFavorite = (movie, favorites) => dispatch => {
    dispatch(fetchFavoritesList());

    deleteEntity(Collections.favorites, movie)
        .then(() => dispatch(deleteFavoriteMovie(favorites.filter(fav => fav.id !== movie.id))))
        .catch(error => console.error(error))
    ;
};
