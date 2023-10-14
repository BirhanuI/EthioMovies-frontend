import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import jwtDecode from "jwt-decode";
import LoginForm from "./components/loginForm";
import MainView from "./components/mainView";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import PaymentResponse from "./components/payment-response";
import AdminDashboard from "./components/adminDashboard";
import ForgotPassword from "./components/forgotPassword";
import "./app.css";

const App = () => {
  const [Movies, setMovies] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const authenticate = (user) => {
    if (user.isSubscribed) {
      setAuthenticated(true);
    } else if (user.isAdmin) {
      setAdmin(true);
      setAuthenticated(true);
    }
  };
  const updateUser = () => {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    setCurrentUser(user);
    authenticate(user);
    if (user) {
      axios
        .post("http://localhost:5000/g2movies/user/check", user)
        .then((res) => {
          const user = jwtDecode(res.data);
          localStorage.setItem("token", res.data);
          setCurrentUser(user);
          authenticate(user);
        });
    }
  };
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/movies")
        .then((res) => setMovies(res.data));
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
      setInterval(() => {
        updateUser();
      }, 10000);
    } catch (error) {}
  }, []);
  const toggleLogin = () => {
    setIsLogged(!isLogged);
  };
  return (
    <div className="app">
      <ToastContainer />
      <div className="main-view">
        <Navbar onToggle={toggleLogin} user={currentUser} />
        <Routes>
          <Route
            path="/home/*"
            element={<MainView Movies={Movies} user={currentUser} />}
          />
          <Route
            path="/movies/*"
            element={<MainView Movies={Movies} user={currentUser} />}
          />
        </Routes>
      </div>
      <LoginForm isLogged={isLogged} onToggle={toggleLogin} />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/g2movies/payment/:id" element={<PaymentResponse />} />
        {isAuthenticated ? (
          <Route
            path="/g2movies/admin/dashboard/*"
            element={<AdminDashboard />}
          />
        ) : (
          <Route
            path="/g2movies/admin/dashboard/*"
            element={<Navigate to={"/register"} />}
          />
        )}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default App;
