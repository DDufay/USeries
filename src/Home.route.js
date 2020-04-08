import React from 'react';
import {Route, Redirect} from 'react-router-dom';


/**
 * Display Authentication or Dashboard component.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const HomeRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <Route {...rest} render={props => {
            if (isLoggedIn) {
                return <Redirect to={{ pathname: '' }}/>
            } else {
                return <Component {...props} />
            }
        }} />
    );
};
