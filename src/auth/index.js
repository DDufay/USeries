import React, { useState, useEffect, Fragment } from "react";
import * as Auth from "../../config/api/Auth";
import Logout from "./Logout";
import {Login} from "./Login";
import SignUp from "./SignUp";

export const Forms = ({ id, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.authenticate(user => setUser(user));
  }, [user]);
  return (
    <Fragment>
      {currentUser ? (
        <Logout />
      ) : (
        <div>
          <Login id={id} />
          {/*<SignUp id={id} />*/}
        </div>
      )}
    </Fragment>
  );
};
