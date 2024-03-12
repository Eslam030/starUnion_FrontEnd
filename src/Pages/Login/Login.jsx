import { Link } from "react-router-dom";
import "./Login.css";
import Logolayout from "../../assets/star_logo.png";
import LogIllustrator from "../../assets/login-illustrator.svg";
import Footer from "../../Components/Footer/Footer";

const Login = () => {
  return (
    <>
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="login">
        <div className="login_card">
          <h1>
            <span>Star </span>Union
          </h1>
          <form action="">
            <input type="email" placeholder="E-mail or User Name" required />
            <input type="password" placeholder="Password" required />
            <p>Don't have an account? <Link to="/register" className="register_link">Register</Link> </p>
            <button className="Log_btn">Log In</button>
          </form>
        </div>

        <div className="log_img">
          <img src={LogIllustrator} alt="Login Illustrator" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
