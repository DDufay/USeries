import React from "react";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

// import * as Auth from "../../config/api/Auth";
import {RenderField} from "../validations/form";
import {ValidateEmail} from "../validations";

export const ResetPassword = () => {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    return <div className="login-page">
        <div className="login-page-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-title">USeries</div>
                <RenderField
                    label="Adresse email"
                    name="email"
                    form={register({ validate: value => ValidateEmail(value) })}
                    type="text"
                    error={errors.email}
                />
                <button className="login-page-form-submit">Envoyer</button>
                <div className="register-now">
                    Vous n'avez pas de compte ? <Link to="/register">Inscrivez-vous</Link>
                </div>
            </form>
        </div>
    </div>
};
