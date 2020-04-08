import React from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

// import * as Auth from "../../config/api/Auth";
import {RenderField} from "../validations/form";
import {ValidateNotEmpty} from "../validations";

export const Login = () => {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return <div className="login-page">
      <div className="login-page-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-title">USeries</div>
          <RenderField
              label="Nom d'utilisateur"
              name="username"
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
