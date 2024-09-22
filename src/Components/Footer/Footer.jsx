import { Link as LinkRoll } from "react-scroll";
import { Link } from "react-router-dom";
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
          <Link to="/workshops">Learning</Link>
        </li>
        </ul>
      </div>

      <div className="footer_content">
        <h4>Company</h4>
        <ul>
        <li>
          <LinkRoll to="HOME" spy={true} smooth={true} offset={50} duration={0}>
            Home
          </LinkRoll>
        </li>
        <li>
          <LinkRoll to="About" spy={true} smooth={true} offset={50} duration={0}>
            About US
          </LinkRoll>
        </li>
        <li>
          <LinkRoll to="workshop" spy={true} smooth={true} offset={50} duration={0}>
            Workshop
          </LinkRoll>
        </li>
        <li>
          <LinkRoll to="Events" spy={true} smooth={true} offset={50} duration={0}>
            Events
          </LinkRoll>
        </li>
        </ul>
      </div>

      <div className="footer_content">
        <h4>Supports</h4>
        <ul>
        <li>
          <LinkRoll to="contact" spy={true} smooth={true} offset={50} duration={0}>
            Contact US
          </LinkRoll>
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
          <a 
          href="https://www.linkedin.com/company/star-union2024/posts/?feedView=all"
          target="_blank"
          >Linkedin
          </a>
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
