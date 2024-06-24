import { Link } from "react-scroll";
import "./Footer.css";

const Footer = () => {
  const d = new Date();
  return (
    <footer className="container">
      <h1>
        <span>Star</span> <br /> Union
      </h1>
      <div className="footer_content">
        <h4>Our Services</h4>
        <ul>
        <li>
          <a href="">Learning</a>
        </li>
        </ul>
      </div>

      <div className="footer_content">
        <h4>Company</h4>
        <ul>
        <li>
          <Link to="HOME" spy={true} smooth={true} offset={50} duration={0}>
            Home
          </Link>
        </li>
        <li>
          <Link to="About" spy={true} smooth={true} offset={50} duration={0}>
            About US
          </Link>
        </li>
        <li>
          <Link to="workshop" spy={true} smooth={true} offset={50} duration={0}>
            Workshop
          </Link>
        </li>
        <li>
          <Link to="Events" spy={true} smooth={true} offset={50} duration={0}>
            Events
          </Link>
        </li>
        </ul>
      </div>

      <div className="footer_content">
        <h4>Supports</h4>
        <ul>
        <li>
          <Link to="contact" spy={true} smooth={true} offset={50} duration={0}>
            Contact US
          </Link>
        </li>
        </ul>
      </div>

      <div className="footer_content">
        <h4>Our Social Media</h4>
          <ul>
          <li>
          <a
            href="https://www.facebook.com/profile.php?id=61551413932501 "
            target="_blank"
          >
            Facebook
          </a>
        </li>
        <li>
          <a href="">Linkedin</a>
        </li>
          </ul>
      </div>
      <p className="copyRight">
        © {d.getFullYear()} Star Union - All rights reserved
      </p>
    </footer>
  );
};
export default Footer;
