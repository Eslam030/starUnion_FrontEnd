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
        <Link to="/" replace={true}>
          <button className="btn">Back to home </button>
        </Link>
    </div>
  );
};

export default Errorpage;
