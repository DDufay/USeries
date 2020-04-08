import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import { Header } from "./index";
import {login} from "../actions/users";
import {getCurrentUser} from "../reducers/users";

export const App = ({ children }) => {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);

    useEffect(() => {
        dispatch(login());
    }, []);

    return <div className="App">
        <Header currentUser={user} />
        {children}
    </div>
};
