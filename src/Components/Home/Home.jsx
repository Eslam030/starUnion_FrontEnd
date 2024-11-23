import React, { useEffect, useState } from "react";
import Star_logo from '../../assets/star_logo2-removebg-preview.png'
import { Link } from "react-router-dom";
import { IsJoinUsBtn } from "../../Api/Endpoints/AppEndPoints";
import { useDispatch } from "react-redux";
import { setIsJoinUs } from "../../Store/authSlice";
import "./Home.css";




const Home = () => {
  const dispatch = useDispatch(); 

  const [isJoinUS, setJoinUs] = useState(false);


  useEffect(() => {
    IsJoinUsBtn(
      (response) => {
        setJoinUs(response.message);
        dispatch(setIsJoinUs(response.message));
      },
      (error) => {
        console.error(error)
      }
    );
  }, []);

  return (
    <div className="Home_page" id="Home">
      <div className="txt">
        <h1>Reach the Stars</h1>

        <p>
          Discover the ultimate destination for all your needs - join us now!
        </p>
        {isJoinUS ?        
         <Link to={'/joinUs'}>
          <button className="btn">Join Us</button>
        </Link>
        :
        ""
      }
      </div>
      <img src={Star_logo} alt="Star logo" className="star_img" />
    </div>
  );
};

export default Home;
 