import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({user}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/home');
    toast.warning("Please subscribe first.")
  });
  return (<h1>Loading</h1>)
}
export default PrivateRoute;
