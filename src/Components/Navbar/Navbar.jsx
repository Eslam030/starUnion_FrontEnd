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

let domain = "https://starunion.pythonanywhere.com"

const Navbar = () => {
  const token = useSelector(state => state.auth.token)
  const username = useSelector(state => state.auth.username)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);  // State to manage the menu visibility

const toggleMenu = () => {
  setIsOpen(!isOpen);  // Toggle the state between true and false
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
          // if (response['modified'] != null) {
          //     console.log('token is modified')
          // }
          console.log(response['message'])
      } , 
      error : function (error) {
          console.log(error)
      }
  })
  }

  return (
    <nav>
      <a href="">
        <img src={star_logo} alt="Logo" className="logo" />
      </a>
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
      {/* <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleMenu} width={20} viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg> */}

      {token
    ? 
      <div className="logout_container">
        <Link onClick={logout}>
        <button className="login_btn">    
          Log out
        </button>
        </Link>  
        <Link to={`/userPage/${username}`}>
          <div className="user-page">
            <img src={User_01} alt="User" className="user_img" />
          </div>
        </Link>
      </div>

    : 
          <Link to="/login">
          <button className="login_btn">    
            Log In
            {/* <img src={User_01} alt="User" className="user_img" /> */}
          </button>
          </Link>
    }

      
      {" "}
    </nav>
  );
};

export default Navbar;
