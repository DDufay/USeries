import React from "react";
import { useForm } from "react-hook-form";
import {Link, useHistory} from "react-router-dom";

import {RenderField} from "../validations/form";
import {ValidateNotEmpty} from "../validations";
import {singIn} from "../api/Auth";
import {User} from "../models/User";
import {loginUser} from "../actions/users";
import {useDispatch} from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {register, handleSubmit, errors} = useForm();

  const onSubmit = data => {
    singIn(data)
        .then(user => {
          dispatch(loginUser(User(user)));
          localStorage.setItem('isLoggedIn', true);
          history.push('/');
        })
        .catch(() => {
          dispatch(loginUser(null));
          localStorage.removeItem('isLoggedIn');
        })
  };

  return <div className="login-page">
      <div className="login-page-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-title">USeries</div>
          <RenderField
              label="Email"
              name="email"
              form={register({ validate: value => ValidateNotEmpty(value) })}
              type="text"
              error={errors.username}
          />
          <RenderField
              label="Mot de passe"
              name="password"
              form={register({ validate: value => ValidateNotEmpty(value) })}
              type="password"
              error={errors.password}
          />
          <div className="forget-password">
            <Link to="/reset-password">Mot de passe oublié ?</Link>
        </div>
          <button className="login-page-form-submit">Connexion</button>
          <div className="register-now">
            Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
          </div>
        </form>
    </div>
  </div>
};
