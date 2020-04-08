import {combineReducers} from 'redux';

import movie from './movies';
import favorite from './favorites';
import user from './users';
import serie from './series';

/**
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducer = combineReducers({
    movie,
    favorite,
    user,
    serie
});

export default rootReducer;
