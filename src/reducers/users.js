import {createReducer} from "../helpers/helper";
import {LOGIN_USER} from "../actions/users";

const initialState = {
    user: {}
};

const actionHandlers = {
    [LOGIN_USER]: (state, user) => ({ ...state, ...user }),
};

const local = state => state.user;

export const getCurrentUser = state => (local(state).user || {});

export default createReducer(initialState, actionHandlers);
