import { Link as LinkRoll } from "react-scroll";
import { Link } from "react-router-dom";
import "./Navbar.css";
import star_logo from "../../assets/star_logo.png";
import User_01 from "../../assets/User_01.png";
import { clearAuthToken } from "../../Auth/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { $ } from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from "react";

import 'boxicons'


let domain = "https://starunion.pythonanywhere.com"

const Navbar = () => {
  const token = useSelector(state => state.auth.token)
  const username = useSelector(state => state.auth.username)
  const dispatch = useDispatch()
  const [sideBar, setSideBar] = useState(false);  // State to manage the menu visibility
  const [isOpen, setIsOpen] = useState(false);  // State to manage the menu visibility


const toggleMenu = () => {
  setIsOpen(!isOpen);  
};

const showSideBar = () => {
  setSideBar(!sideBar);  
};

  const logout = () => {
    
    $.ajax ({ 
      url : domain + '/main/logout/' , 
      method : 'POST' ,
      headers: {
          'Authorization': 'JWT ' + token,
      }, 
      success : function (response) {
          if (response['access'] != null) {
            dispatch(clearAuthToken())
          }
      } , 
      error : function (error) {
          console.log(error)
      }
  })
  }

  return (
    <>
    <nav>
      <Link id="HOME">
        <img src={star_logo} alt="Logo" className="logo" />
      </Link>

      <ul className={`navLinks ${isOpen ? 'show_nav' : ''}`}>
        <li>
          <Link to="/" spy={true} smooth={true} offset={50} duration={0}>
            Home
          </Link>
        </li>
        <li>
          <LinkRoll
            to="About"
            spy={true}
            smooth={true}
            offset={50}
            duration={0}
          >
            About US
          </LinkRoll>
        </li>
        <li>
          <LinkRoll
            to="Events"
            spy={true}
            smooth={true}
            offset={50}
            duration={0}
          >
            Events
          </LinkRoll>
        </li>
        <li>
          <LinkRoll
            to="workshop"
            spy={true}
            smooth={true}
            offset={50}
            duration={0}
          >
            Workshop
          </LinkRoll>
        </li>
        <li>
          <LinkRoll
            to="contact"
            spy={true}
            smooth={true}
            offset={50}
            duration={0}
          >
            Contact US
          </LinkRoll>
        </li>
      </ul>

    {token
    ? 
    <div className="user_info">
      <div className="nameOfUser">{username}</div>
      <div className="user_details">
          <div className="user-page" onClick={toggleMenu}>
            <img src={User_01} alt="User" className="user_img" />
          </div>
          <div className={`btns ${isOpen ? 'Active' : 'unActive'}`}>
            <Link to={`/userPage/${username}`}>
              <button>Profile</button>
            </Link>
            <Link onClick={logout}>
              <button>Logout</button>
            </Link>
          </div>
      </div>
    </div>

    : 
    <div className="login_section">
      <Link to="/register" style={{gap: '10px'}}>
          <button className="login_btn">    
            Sign in
          </button>
      </Link>

      <Link to="/login">
          <button className="login_btn">    
            Log In
          </button>
      </Link>
    </div>
    }
      <div className="nav_icon" onClick={showSideBar}>
       <box-icon name='menu' color='#6139d0'></box-icon>
      </div>

    </nav>

    {/* Nav Section For mobile version */}
    <div className="sideNav_container">
      <div className={sideBar ? "sideNav active_nav" : "sideNav"}>
        <div className="nav_links">

          <div className="main_links">

            <div className="closeNavBar" onClick={showSideBar}>
              <Link to='#'>
                <box-icon name='x' color='#6139d0'></box-icon>
              </Link>

            </div>

            {token ? 
              <div className="user_sideNav_info">
                <Link to={`/userPage/${username}`}><p className="nameOfUser">{username}</p></Link>
                <div className="user-page">
                  <img src={User_01} alt="" className="user_img"/>
                </div>
              </div>
            : "" 
          }



            <ul className="nav_menu_items"  >
              <li>
                <LinkRoll to="HOME" spy={true} smooth={true} offset={50} duration={0} onClick={showSideBar}>
                  Home
                </LinkRoll>
              </li>

              <li>
                <LinkRoll
                  onClick={showSideBar}
                  to="About"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={0}
                >
                  About US
                </LinkRoll>
              </li>

              <li>
                <LinkRoll
                  to="Events"
                  onClick={showSideBar}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={0}
                >
                  Events
                </LinkRoll>
              </li>

              <li>
                <LinkRoll
                  to="workshop"
                  onClick={showSideBar}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={0}
                >
                  Workshop
                </LinkRoll>
              </li>

              <li>
                <LinkRoll
                  to="contact"
                  onClick={showSideBar}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={0}
                >
                  Contact US
                </LinkRoll>
              </li>

            </ul>

          </div>

          <div className="register_section ">

            {token 
              ?
              <div className="sideNav_acc">
              <Link to={`/userPage/${username}`}>
                  <button>Profile</button>
              </Link>
              <Link onClick={logout}>
                  <button>Logout</button>
                </Link>
              </div>
            
              :
            <>
            <Link to="/register">
                <button className="login_btn">    
                  Sign in
                </button>
            </Link>

            <Link to="/login">
                <button className="login_btn">    
                  Log In
                </button>
            </Link>
            </>

            }
          </div>

        </div>

      </div>
    </div>

  </> 
  );
};

export default Navbar;
