import userImage from "../../assets/User_img1.png";
import userIcon from "../../assets/user_icon1.png";
import userSaveIcon from "../../assets/userSave_icon2.png";
import lampImg from "../../assets/lamp1.png";
import lightImg from "../../assets/light1.png";
import Logolayout from "../../assets/star_logo.png";
import { Link } from "react-router-dom";
import "./UserPage.css";

const UserPage = () => {
  return (
    <>
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="UserPage">
        <div className="userInfo">
          <div className="user_img">
            <img src={userImage} alt="User Image" />
            <h1 className="user_name">Ema Watrson</h1>
            <div className="icons">
              <img src={userSaveIcon} alt="User Save Icon" />
              <img src={userIcon} alt="User Icon" />
            </div>
          </div>

          <div className="user_details">
            <div className="personal_data">
              <h1 className="detail_sec">Personal Details</h1>
              <h3 className="info_sec">Name</h3>
              <h2 className="user_data">Ema Watrson Dalapo</h2>

              <h3 className="info_sec">Gender</h3>
              <h2 className="user_data">Female</h2>

              <h3 className="info_sec">Position</h3>
              <h2 className="user_data">Head of web</h2>
            </div>

            <div className="contact_details">
              <h1 className="detail_sec">Contact Details</h1>
              <h3 className="info_sec">Phone Number</h3>
              <h2 className="user_data">+20 123 456 7891</h2>

              <h3 className="info_sec">Email</h3>
              <h2 className="user_data">email123@gmail.com</h2>
            </div>
          </div>
        </div>

        <div className="edit_sec">
          <div className="lamp_img">
            <img src={lampImg} alt="Lamp Image" className="lamb" />
            <img src={lightImg} alt="Light Image" className="light" />
          </div>
          <button className="btn">Edit</button>
        </div>
      </div>
    </>
  );
};

export default UserPage;
