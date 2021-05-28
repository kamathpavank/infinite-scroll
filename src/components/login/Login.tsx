import React from "react";
import { useFormik } from "formik";
import "./login.css";

interface Props {
  history: any;
}

export const Login = (props: Props) => {
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      localStorage.setItem("token", "asdaedasdasdaxasx");
      props.history.push("/home");
    },
  });
  return (
    <>
      <div className="login">
        <form onSubmit={formik.handleSubmit}>
          <h5 className="card-title text-center">Login</h5>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <div className="invalid-feedback">Please Enter Username</div>
            ) : null}

            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
			{formik.errors.password ? (
              <div className="invalid-feedback">Please Enter Password</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
