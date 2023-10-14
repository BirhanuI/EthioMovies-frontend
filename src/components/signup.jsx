import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MuiTelInput } from "mui-tel-input";
import Joi, { schema } from "joi-browser";
const Signup = () => {
  const Navigate = useNavigate();
  schema = {
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(13).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(16).required(),
    confirmPassword: Joi.ref("password"),
  };
  const style = {
    backgroundColor: "#123456",
    width: "100%",
    border: "0px",
    padding: "15px 0",
    fontSize: "1rem",
    color: "white",
    borderRadius: "15px 0",
  };
  const [phoneNumber, setValue] = React.useState("+251");
  const [error, setError] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const validate = (userData) => {
    const result = Joi.validate(userData, schema);
    if (!result.error) return {};
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      phone: phoneNumber,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };
    try {
      const errors = validate(userData);
      setError(errors);
      if (Object.keys(errors).length === 0) {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/g2movies/user/signup",
          data: userData,
        });
        if (!Object.keys(response.data).length == 0) {
          localStorage.setItem("token", response.data);
          toast.success("Registered Succsesfully.");
          setTimeout(() => {
          Navigate("/home")
            window.location.reload(true);
          }, 1000);
        } else {
          setError({ email: "User with given username already exists." });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleClose = ()=>{
    Navigate("/home")
  }
  return (
    <div>
      <div className="module" onClick={handleClose}></div>
      <div className="login-form">
        <form
          onSubmit={handleSubmit}
          onChange={() => {
            setError({});
          }}
        >
          <h1>SignUp</h1>
          <div className="content">
            <div className="input-field">
              <input type="text" placeholder="First Name" name="firstname" />
            </div>
            <div className="error">{error.firstname}</div>
            <div className="input-field">
              <input type="text" placeholder="Last Name" name="lastname" />
            </div>
            <div className="error">{error.lastname}</div>
            <div className="input-field">
              Phone Number:{" "}
              <MuiTelInput value={phoneNumber} onChange={handleChange} />
            </div>
            <div className="error">{error.phone}</div>

            <div className="input-field">
              <input type="" placeholder="Email" name="email" />
            </div>
            <div className="error">{error.email}</div>
            <div className="input-field">
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="error">{error.password}</div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
            </div>
            <div className="error">{error.confirmPassword}</div>
          </div>

          <button type="submit" style={style}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
