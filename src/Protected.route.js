import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {App} from "./components/App";

/**
 * Display protected components.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    return (
        <Route {...rest} render={props => {
            if (isLoggedIn) {
                return <div className="content">
                    <App>
                        <Component {...props} />
                    </App>
                </div>
            } else {
                return <Redirect to={{ pathname: '', state: {from: props.location} }} />
            }
        }} />
    );
};
