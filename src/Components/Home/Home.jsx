import React from "react";
import "./Home.css";
import Star_logo2 from "../../assets/star logo 2.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home_page" id="Home">
      <div className="txt">
        <h1>Reach the Stars</h1>
        <p>
          Discover the ultimate destination for all your needs - join us now!
        </p>
        <Link to="/userPage">
          <button className="btn">Join Us</button>
        </Link>
      </div>
      <img src={Star_logo2} alt="Star logo" className="star_img" />
    </div>
  );
};

export default Home;
