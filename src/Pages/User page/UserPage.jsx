import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PreLoader from '../../Components/Loading/PreLoader'; // Loader file
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form"
import Avatar from 'react-avatar-edit'

import { UserPageData, checkUserForChange } from '../../Api/Endpoints/AppEndPoints'; // api
import { DOMAIN } from '../../Api/config'; // main domain
// For Images
import userIcon from '../../assets/user_icon1.png';
import userSaveIcon from '../../assets/userSave_icon2.png';
import lampImg from '../../assets/lamp1.png';
import lightImg from '../../assets/light1.png';
import Logolayout from '../../assets/star_logo.png';
import Girl_Img from '../../assets/User_img1.png'
import Man_Img from '../../assets/User_img2.png'
// CSS file
import './UserPage.css';

const UserPage = () => {
  const { control ,handleSubmit ,formState: { errors }, getValues} = useForm({mode:'onTouched'})
  const { UserName } = useParams();
  const username = useSelector((state) => state.auth.username);
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState({});
  const [isUser, setIsUser] = useState(false);
  // const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [storeImage, setStoreImage] = useState([]);
  const [onLight, setOnLight] = useState(true);
  

  const turnLightOff = () => {
    setOnLight(false)
  }


  const onClose = () => {
    setPreview(null);
  }
  const onCrop = (view) => {
    setPreview(view);
  }
  const saveImage = () => {
    if (preview) {
      updateUserProfileImage(preview);  // Assuming you handle image saving in this function
    }
  }
  // const saveImage = () => {
  //   if (preview) {
  //     setLoading(true);
  //     updateUserProfileImage(preview, userData.id)
  //       .then(() => {
  //         setLoading(false);
  //         alert('Image saved successfully!');
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setError('Failed to save image');
  //       });
  //   }
  // };


  useEffect(() => {
    if(username) {
      UserPageData(UserName, 
        (response) => {
        if (response.message === 'Done' && response.user) {
            setUserData(response.user); // Assuming the user data is contained in response.user 
        } else {
            console.log('Failed to fetch user data:', response.message);
            setLoading(false);
          }
      },
      (error) => {
        console.log('Error fetching user data:', error);
        setLoading(false);
      }
    )
    }
  },[username, UserName])

  useEffect(() => {
    if(token) {
      checkUserForChange(token, UserName, 
      (response) => {
        if(response.message == 'Yes') {
            setIsUser(true)
            setOnLight(true);
        } else {
            setIsUser(false)
            setOnLight(false);
          }
      },
      (error) => {
        console.log(error)
        setIsUser(false)
      }
    )
    }
  }, [token, username])

  const onSubmit = (data) => {
    
  }

  return (
    <>
    <PreLoader />
    <div className="user_body">
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
      <div className="UserPage">

        <div className="userInfo">
          <div className="user_img">
            {/* Adjust according to your API response and ensure you handle image path correctly */}

            <img src={(userData.gender === 'M' ? Man_Img : Girl_Img) || `${DOMAIN}/main/getImage?path=${userData.photo}`} alt="User Image" />
            {/* <img src={preview || `${DOMAIN}/main/getImage?path=${userData.photo}`} alt="User Image" /> */}
            {/* <div className="change_img">
            <Avatar 
                width={300}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                borderStyle={0} 
                label="Change Image"
            />
            </div>
            <button type='submit' style={{cursor: 'pointer'}} onClick={saveImage}>Save</button> */}

            <h1 className="user_name">{`${userData.first_name || ''} ${userData.last_name || ''}`}</h1>
            <div className="icons">
              <img src={userSaveIcon} alt="User Save Icon" />
              <img src={userIcon} alt="User Icon" />
            </div>
          </div>
          <div className="user_details">
            <div className="personal_data">
              <h1 className="detail_sec">Personal Details</h1>
              <h3 className="info_sec">Name</h3>
              <h2 className="user_data">{`${userData.first_name || ''} ${userData.last_name || ''}`}</h2>
              <h3 className="info_sec">Gender</h3>
              <h2 className="user_data">{(userData.gender === 'M' ? "Male" : "Female") || 'N/A' }</h2>
              <h3 className="info_sec">Position</h3>
              <h2 className="user_data">{userData.position || 'N/A'}</h2>
              <h3 className="info_sec">University</h3>
              <h2 className="user_data">{userData.university || 'N/A'}</h2>
              <h3 className="info_sec">College</h3>
              <h2 className="user_data">{userData.collage}</h2>
              <h3 className="info_sec">Level</h3>
              <h2 className="user_data">{`Level ${userData.level || 'N/A'}`}</h2>
            </div>

            <div className="contact_details">
              <h1 className="detail_sec">Contact Details</h1>
              <h3 className="info_sec">Phone Number</h3>
              <h2 className="user_data">{userData.phone || 'N/A'}</h2>
              <h3 className="info_sec">Email</h3>
              <h2 className="user_data">{userData.email || 'N/A'}</h2>
            </div>
            
          </div>
        </div>
        <div className="edit_sec">
          <div className="lamp_img">
            <img src={lampImg} alt="Lamp Image" />
            <img src={lightImg} alt="Light Image" className={`Light ${onLight ? 'on' : 'off'}`}/>
          </div>
          <div>
            {isUser ? <button className="btn" onClick={turnLightOff}>Edit</button> : ""}
          </div>
        </div>
      </div>

      {/* <div className="userEdit_container">

      <div className="userEdit">
        <div className="edit_title">
          Update my information
        </div>

        <div className="edit_form">

          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="user_input">
              <p className='input_title'>Username</p>
              
              <Controller
                  name="Username"
                  rules={{
                    required: "User Name is required",
                    minLength:{
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Not a valid name",
                      }
                  }}
                  control={control}
                  render={({ field }) => (<Input  error={Boolean(errors?.Username?.message)} placeholder="Username" {...field}/>)}
                />
                {errors?.Username?.message && <span className="alert">{errors?.Username?.message} *</span>}
            </div>

            
          </form>

        </div>
        </div>

      </div> */}

      </div>
    </>
  );
};

export default UserPage;

