import { Link } from "react-router-dom";
import "./Errorpage.css";
import Footer from "../../Components/Footer/Footer";
import Logolayout from "../../assets/star_logo.png";

const Errorpage = () => {
  return (
    <div className="error">
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <h1>Oops!</h1>
      <p>Page not found</p>
      <button className="btn">
        <Link to="/">Back to home</Link>
      </button>
    </div>
  );
};

export default Errorpage;
