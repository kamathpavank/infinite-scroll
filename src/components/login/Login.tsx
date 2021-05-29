import React from "react";
import { useFormik } from "formik";
import "./login.css";
import { useHistory } from "react-router-dom";
import { LoginForm } from "../../types/loginForm";

interface Props {}

export const Login = (props: Props) => {
  const initialValues: LoginForm = { username: "", password: "" };

  let history = useHistory();
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
    initialValues: initialValues,
    validate,
    onSubmit: (values) => {
      localStorage.setItem("token", "asdaedasdasdaxasx");
      history.push("/home");
    },
  });
  return (
    <>
      <div className="login">
        <form onSubmit={formik.handleSubmit}>
          <h5 className="card-title text-center">Login</h5>
          <p className="text-secondary text-center mt-1 mb-3">Enter random username and password to login</p>
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
              <div className="text-danger mb-1 mt-0">Please Enter Username</div>
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
              <div className="text-danger mb-1 mt-0">Please Enter Password</div>
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
