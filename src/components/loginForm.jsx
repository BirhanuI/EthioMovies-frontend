import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link,  redirect } from "react-router-dom";
import Joi, { schema } from "joi-browser";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./login-form.css";
const LoginForm = (props) => {
  const [error, setError] = useState({ email: "", password: "" });
  schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required(),
  };
  const validate = (userData) => {
    const result = Joi.validate(userData, schema);
    if (!result.error) return {};
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const errors = validate(userData);
      setError(errors);
      if (Object.keys(errors).length === 0) {
        await axios({
          method: "post",
          url: "http://localhost:5000/g2movies/user/login",
          data: userData,
        }).then((response) => {
          if (response.data) {
            localStorage.setItem("token", response.data);
            toast.success("Logging In.");
            setTimeout(() => {
              redirect("/");
              window.location.reload(true);
            }, 3000);
          } else toast.error("incorrect email or password");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`login ${props.isLogged ? "show" : ""}`}>
      <div className="module" onClick={props.onToggle}></div>
      <div className="login-form">
        <form
          onSubmit={handleSubmit}
          onChange={() => {
            setError({});
          }}
        >
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input type="" placeholder="Email" name="email" />
            </div>
            <div className="error">{error.email}</div>
            <div className="input-field">
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="error">{error.password}</div>
            <Link to={"/forgotpassword"} className="link" onClick={props.onToggle}>
              Forgot Your Password?
            </Link>
          </div>
          <div className="action">
            <button>
              <Link to="/register">
                <button onClick={props.onToggle}>Register</button>
              </Link>
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
