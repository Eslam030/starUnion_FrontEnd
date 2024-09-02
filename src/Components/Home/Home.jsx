import React from "react";
import "./Home.css";
// import Star_logo2 from "../../assets/star_logo2.png";
import Star_logo from '../../assets/star_logo2-removebg-preview.png'
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="Home_page" id="Home">
      <div className="txt">
        <h1>Reach the Stars</h1>

        <p>
          Discover the ultimate destination for all your needs - join us now!
        </p>
        <Link>
          {/* <button className="btn">Join Us</button> */}
        </Link>
      </div>
      <img src={Star_logo} alt="Star logo" className="star_img" />
    </div>
  );
};

export default Home;
 