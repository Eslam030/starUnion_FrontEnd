import { Link as LinkRoll } from "react-scroll";
import { Link } from "react-router-dom";
import "./Navbar.css";
import star_logo from "../../assets/star_logo.png";
import User_01 from "../../assets/User_01.png";

const Navbar = () => {
  return (
    <nav>
      <a href="">
        <img src={star_logo} alt="Logo" className="logo" />
      </a>
      <ul>
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
      <button className="login_btn">
        <Link to="/login">Log In</Link>{" "}
        <img src={User_01} alt="User" className="user_img" />
      </button>
    </nav>
  );
};

export default Navbar;
