import {makeActionCreator} from "../helpers/helper";
import {authenticateUser} from "../api/Auth";
import {User} from "../models/User";

export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = makeActionCreator(LOGIN_USER, 'user');

export const login = () => dispatch => {
    authenticateUser()
        .then(user => {
            dispatch(loginUser(User(user)));
            localStorage.setItem('isLoggedIn', true);
        })
        .catch(() => {
            dispatch(loginUser(null));
            localStorage.removeItem('isLoggedIn');
        })
    ;
};
