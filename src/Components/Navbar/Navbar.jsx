import React, { useState, useEffect, useRef, useCallback } from "react";
import { DOMAIN } from "../../Api/config";
import $ from "jquery"
import { Link as LinkRoll } from "react-scroll";
import { Link } from "react-router-dom";
import "./Navbar.css";
import star_logo from '../../assets/star_logo2.png';
import User_01 from "../../assets/User_01.png";
import useIsAuthUser from "../../Auth/useAuthUserCookies";
import 'boxicons';

import { SpinnerCircular } from 'spinners-react';
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false); 
  const [isOpen, setIsOpen] = useState(false);   
  
  const {isAuthUser, userAuthName, setIsAuthUser , loading} = useIsAuthUser();
  const dispatch = useDispatch()
  // Ref for the menu box
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showSideBar = () => {
    setSideBar(!sideBar);
  };


  const logout = () => {
    
    $.ajax({
      url: DOMAIN + '/main/logout/',
      method: 'POST',
      xhrFields: {
        withCredentials: true  
      },
      success: function (response) {
        setIsAuthUser(false); 
      },
      error: function (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthUser(false);  
      }
      }
    });
  };

  // Close the menu when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

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
            <LinkRoll to="About" spy={true} smooth={true} offset={50} duration={0}>
              About US
            </LinkRoll>
          </li>
          <li>
            <LinkRoll to="Events" spy={true} smooth={true} offset={50} duration={0}>
              Events
            </LinkRoll>
          </li>
          <li>
            <LinkRoll to="workshop" spy={true} smooth={true} offset={50} duration={0}>
              Workshop
            </LinkRoll>
          </li>
          <li>
            <LinkRoll to="contact" spy={true} smooth={true} offset={50} duration={0}>
              Contact US
            </LinkRoll>
          </li>
        </ul>

        {loading ? (
          // Display loading spinner while loading
          <div className="loading_spinner">
            <SpinnerCircular color={"#6139D0"} />
          </div>
        ) : isAuthUser ? (
          <div className="user_info">
            <Link to={`/userPage/${userAuthName}`}>
              <p className="nameOfUser">{userAuthName}</p>
            </Link>
            <div className="user_details">
              <div className="user-page" onClick={toggleMenu} ref={menuRef}>
                <img src={User_01} alt="User" className="user_img" />
              </div>
              <div className={`btns ${isOpen ? 'Active' : 'unActive'}`} ref={menuRef}>
                <Link to={`/userPage/${userAuthName}`}>
                  <button>Profile</button>
                </Link>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="login_section">
            <Link to="/login">
              <button className="login_btn">    
                Log In
              </button>
            </Link>
          </div>
        )}
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

              {isAuthUser ? 
                <div className="user_sideNav_info">
                  <Link to={`/userPage/${userAuthName}`}><p className="nameOfUser">{userAuthName}</p></Link>
                  <div className="user-page">
                    <img src={User_01} alt="" className="user_img" />
                  </div>
                </div>
              : "" }

              <ul className="nav_menu_items">
                <li>
                  <LinkRoll to="HOME" spy={true} smooth={true} offset={50} duration={0} onClick={showSideBar}>
                    Home
                  </LinkRoll>
                </li>
                <li>
                  <LinkRoll onClick={showSideBar} to="About" spy={true} smooth={true} offset={50} duration={0}>
                    About US
                  </LinkRoll>
                </li>
                <li>
                  <LinkRoll to="Events" onClick={showSideBar} spy={true} smooth={true} offset={50} duration={0}>
                    Events
                  </LinkRoll>
                </li>
                <li>
                  <LinkRoll to="workshop" onClick={showSideBar} spy={true} smooth={true} offset={50} duration={0}>
                    Workshop
                  </LinkRoll>
                </li>
                <li>
                  <LinkRoll to="contact" onClick={showSideBar} spy={true} smooth={true} offset={50} duration={0}>
                    Contact US
                  </LinkRoll>
                </li>
              </ul> 
            </div>

            <div className="register_section">
              {isAuthUser 
                ? 
                <div className="sideNav_acc">
                  <Link to={`/userPage/${userAuthName}`}>
                    <button>Profile</button>
                  </Link>
                    <button onClick={logout}>Logout</button>
                </div>
                : 
                <Link to="/login">
                  <button className="login_btn">    
                    Log In
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

