import axios from 'axios';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import queryString from 'query-string';
import { Link,useParams } from "react-router-dom";
import { useEffect } from 'react';
import bg from "../back.png";
import "./payment-response.css";
const PaymentResponse = () => {
  const {id} = useParams();
  console.log(id)
  const query = queryString.parse(window.location.search);
  useEffect(()=>{
    axios.post("http://localhost:5000/g2movies/user/verifypayment",{...query,id})
    .then(res=>{
        console.log(res.data);
      });
  });
  return (
    <div>
      <img className="bg-image" src={bg} />
      <div className="module"></div>
      <div className="payment-response">
        <p className="title">
          <div className="movies-logo">
            <span>G2</span>movies
          </div>
        </p>
        <div className="response">
          <h1>
            Payment Successful
            <IoCheckmarkDoneCircle className="icon" />
          </h1>

          <p className="discription">{`Dear customer you have succesfully subscribed to our website with package.`}</p>
          <p>Enjoy Our Website.</p>
        </div>
        <h3>
          <Link to={"/home"}>click Here </Link>to redirect to home page.
        </h3>
      </div>
    </div>
  );
};

export default PaymentResponse;
