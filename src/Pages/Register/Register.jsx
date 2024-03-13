import { Link } from "react-router-dom";
import Logolayout from "../../assets/star_logo.png";
import registerImg from "../../assets/register_img.png";
import "./Register.css";

const Register = () => {
  return (
    <>
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="register">
        <div className="form_container">
          <div className="reg_title">Become A Star</div>
          <form action="#">
            <div className="user_reg">
              <div className="input_box">
                <span className="reg_detail">First Name</span>
                <input
                  type="text"
                  name="First name"
                  placeholder="John"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">Last Name</span>
                <input
                  type="text"
                  name="Last name"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">E-mail</span>
                <input
                  type="email"
                  name="Email"
                  placeholder="Johndoe123@example.com"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">Phone</span>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="+20 123 456 7891"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="*************"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">Confirm password</span>
                <input
                  type="password"
                  name="Confirm-password"
                  placeholder="*************"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">University</span>
                <input
                  type="text"
                  name="university"
                  placeholder="Cairo University"
                  required
                />
              </div>
              <div className="input_box">
                <span className="reg_detail">Level</span>
                <input
                  list="Levels"
                  name="Level"
                  placeholder="Level 1"
                  required
                />
                <datalist id="Levels">
                  <option value="Level 1" />
                  <option value="Level 2" />
                  <option value="Level 3" />
                  <option value="Level 4" />
                  <option value="other" />
                </datalist>
              </div>
            </div>
            <div className="gender_details">
              <span className="gender_title">Gender</span>
              <div className="gender_box">
                <input type="radio" name="Gender" value="Male" id="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender_box">
                <input type="radio" name="Gender" value="Female" id="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="btn_container">
            <Link>
                <button className="Register_btn" type="submit">
                    Register
                </button>
            </Link>
            </div>
          </form>
        </div>

        <div className="register_img">
          <img src={registerImg} alt="Register Image" />
        </div>
      </div>
    </>
  );
};

export default Register;
