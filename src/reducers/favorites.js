import {DELETE_FAVORITES_SUCCESS, FETCH_FAVORITES_REQUEST, FETCH_FAVORITES_SUCCESS} from "../actions/favorites";
import {createReducer} from "../helpers/helper";

const initialState = {
    fetching: false,
    favorites: []
};

const actionHandlers = {
    [FETCH_FAVORITES_REQUEST]: state => ({ ...state, fetching: true }),
    [FETCH_FAVORITES_SUCCESS]: (state, favorites) => ({ ...state, favorites, fetching: false }),
    [DELETE_FAVORITES_SUCCESS]: (state, favorites) => ({ ...state, favorites, fetching: false }),
};

const local = state => state.favorite;

export const getFavoritesEntities = state => (local(state).favorites.favorites || []);

export default createReducer(initialState, actionHandlers);
