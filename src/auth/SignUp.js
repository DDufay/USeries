import React, { useState, useEffect } from "react";
import * as Auth from "../../config/api/Auth";
import { Input } from "./Input";

const SignUp = () => {
  let errors = [];
  const [state, setState] = useState({
    isValid: false,
    feedback: { message: null },
    userAccount: {
      email: null,
      password: null
    }
  });

  useEffect(() => {
    validateForm();
  }, [state.userAccount]);

  const setValue = property => {
    setState({
      ...state,
      userAccount: {
        ...userAccount,
        [property.target.name]: property.target.value
      }
    });
  };

  //form validation
  const validateForm = () => {
    const inputs = document.querySelectorAll(".signup-form");
    inputs.forEach(input => {
      !input.value ? errors.push(input) : errors.length && errors.pop();
    });
    setValid(!errors.length);
  };
  const submit = e => {
    e.preventDefault();
    if (errors.length) {
      setState({
        ...state,
        message: "Please fill out all fields"
      });
      return;
    }
    Auth.signUp(userAccount)
      .then(success => {
        if (success) {
          setState({
            ...state,
            message: null
          });
          window.location.reload();
        }
      })
      .catch(err =>
        setState({
          ...state,
          message: `${err.message}`
        })
      );
  };
  return (
    <div>
      <div className="col-sm-10 offset-1" id="signup">
        <h2>Sign Up</h2>
        <form onSubmit={e => submit(e)}>
          <hr />
          {feedback.message && (
            <small className="crimson">{feedback.message}</small>
          )}
          <div class="form-group">
            <Input
              classNames="form-control signup-form"
              value="email"
              type="email"
              action={e => setValue(e)}
            >
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </Input>
            <Input
              classNames="form-control signup-form"
              value="password"
              type="password"
              action={e => setValue(e)}
            >
              <small className="form-text text-muted">
                Choose a complex and secure password
              </small>
            </Input>
          </div>

          <br />
          <button
            disabled={!isValid}
            type="submit"
            className="btn btn-primary btn-sm white bg-violet float-right"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
