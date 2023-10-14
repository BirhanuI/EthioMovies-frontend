import { Link, redirect } from "react-router-dom";
import axios from "axios";
import "./subscribe.css";
const Subscribe = ({ user }) => {
  const pricing = [
    {
      type: "Weekly",
      discription: "Watch all movies unlimited for a ",
      price: 50,
      duration: "Week",
    },
    {
      type: "Monthly",
      discription: "Watch all movies unlimited for a ",
      price: 170,
      duration: "Month",
    },
    {
      type: "Yearly",
      discription: "Watch all movies unlimited for a ",
      price: 1800,
      duration: "Year",
    },
  ];
  const handleSubscribe = async (price,type) => {
    const { id } = user;
    axios({
      method: "post",
      url: "http://localhost:5000/g2movies/user/payment/"+id+"",
      data: {type,price},
    }).then((response) => {
      window.location.replace(response.data);
    });
  };

  return (
    <div className="price">
      <div className="price-content">
        {pricing.map((pricing) => (
          <div className="pricing">
            <h1>{pricing.type}</h1>
            <p>{`${pricing.discription} ${pricing.duration}`} </p>
            <p>
              <span>{pricing.price}</span>
              <b>birr</b>/{pricing.type}
            </p>
            <div
              className="subscribe-btn"
              onClick={() => {
                handleSubscribe(pricing.price, pricing.type);
              }}
            >
              Subscribe
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
