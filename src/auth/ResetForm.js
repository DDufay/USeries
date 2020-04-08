import React, { useState, Fragment } from "react";

const ResetForm = ({ isExpanded, reset }) => {
  const [email, setEmail] = useState("");
  return (
    <Fragment>
      {isExpanded && (
        <Fragment>
          <br id="reset-form" />
          <hr />
          <br />
          <div className="row">
            <h2>&nbsp; &nbsp; Reset Password</h2>
            <div className="form-group col-sm-10">
              <input type="email" className="form-control" />
            </div>
            <button
              disabled={!email.length}
              type="button"
              className="col-sm btn btn-light btn-sm violet btn-reset"
            >
              send link
            </button>
          </div>
          <br />
          <hr />
          <br />
        </Fragment>
      )}
    </Fragment>
  );
};
export default ResetForm;
