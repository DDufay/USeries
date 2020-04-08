import React, {useRef} from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

import {RenderField} from "../validations/form";
import {ValidateEmail, ValidateLength, ValidateSameValue} from "../validations";
import {sendEmailVerification, singUp} from "../api/Auth";

export const Register = () => {
  const {register, handleSubmit, errors, watch, reset} = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = user => {
    singUp(user)
        .then(() => {
          console.log('success');
          reset({ email: "", password: "", confirmPassword: "" });
          sendEmailVerification();
        })
        .catch(error => console.error(error))
    ;
  };

  return <div className="login-page">
      <div className="login-page-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-title">USeries</div>
          {/*<RenderField*/}
          {/*    label="Nom d'utilisateur"*/}
          {/*    name="username"*/}
          {/*    form={register({ validate: ValidateNotEmpty })}*/}
          {/*    type="text"*/}
          {/*    error={errors.username}*/}
          {/*/>*/}
          <RenderField
              label="Email"
              name="email"
              form={register({ validate: ValidateEmail })}
              type="text"
              error={errors.email}
          />
          <RenderField
              label="Mot de passe"
              name="password"
              form={register({ validate: value => ValidateLength(value, 6) })}
              type="password"
              error={errors.password}
          />
          <RenderField
              label="Confirm. mot de passe"
              name="confirmPassword"
              form={register({ validate: value => ValidateSameValue(value, password.current) })}
              type="password"
              error={errors.confirmPassword}
          />
          <button className="login-page-form-submit">Inscription</button>
          <div className="singin-now">
            Vous avez déjà un compte ? &nbsp; <Link to="/login"> Connectez-vous</Link>
          </div>
        </form>
    </div>
  </div>
};
