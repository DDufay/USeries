import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './index.css';
import './style/index.scss';
import * as serviceWorker from './serviceWorker';
import {App} from "./components/App";
import store from './store';
import {Login} from "./auth/Login";
import {Register} from "./auth/Register";
import {ResetPassword} from "./auth/ResetPassword";
import {ProtectedRoute} from "./Protected.route";
import {HomeRoute} from "./Home.route";
import {Profile} from "./components/Profile";
import {Movies} from "./components/Movies";
import {Series} from "./components/Series";
import {Groups} from "./components/Groups";
import {SerieDetail} from "./components/SerieDetail";
import {MovieDetail} from "./components/MovieDetail";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={() => <App><Movies/></App>} />
              <HomeRoute exact path="/login" component={Login} />
              <Route exact path="/series" component={() => <App><Series/></App>} />
              <Route exact path="/serie/:id" component={() => <App><SerieDetail/></App>} />
              <Route exact path="/movie/:id" component={() => <App><MovieDetail /></App>} />
              <Route exact path="/groups" component={() => <App><Groups/></App>} />
              <HomeRoute exact path="/register" component={Register} />
              <HomeRoute exact path="/reset-password" component={ResetPassword} />
              <ProtectedRoute exact component={Profile} path="/profile" />
          </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
