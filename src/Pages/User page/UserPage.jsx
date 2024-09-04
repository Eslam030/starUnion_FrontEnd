import React, { useEffect, useState, useCallback, useRef } from "react";
import Select from 'react-select';
import { Link, useParams } from "react-router-dom";
import PreLoader from "../../Components/Loading/PreLoader"; 
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useIsAuthUser from "../../Auth/useAuthUserCookies";
 
import {
  UserPageData,
  UserPageUpdate,
  userRegistrations,
  registerWorkShop,
  UpdatePassword,
  EventRegistration,
} from "../../Api/Endpoints/AppEndPoints"; // api
import { DOMAIN } from "../../Api/config"; // main domain
import ImageEncode from "../../Components/ImageComponents/ImageEncode";
// For Images
import userIcon from "../../assets/user_icon1.png";
import userSaveIcon from "../../assets/userSave_icon2.png";
import lampImg from "../../assets/lamp1.png";
import lightImg from "../../assets/light1.png";
import Logolayout from "../../assets/star_logo2.png";
// CSS file
import "./UserPage.css";

const UserPage = () => {

  const { isAuthUser, userAuthName } = useIsAuthUser();
  const [userData, setUserData] = useState({ level: '3'});
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({ mode: "onTouched", defaultValues: {
    level: userData.level
  }});
  const { UserName } = useParams();


  const [isUser, setIsUser] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showWS, setShowWS] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [isValidData, setIsValidData] = useState(false);
  const [registeredWorkshopsData, setRegisteredWorkshopsData] = useState([]);
  const [registeredEventsData, setRegisteredEventsData] = useState([]);
  const [changeOptions, setChangeOptions] = useState(false);

  const [showCurrPassword, setShowCurrPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  useEffect(() => {
    if (userData) {
      reset({
        level: userData.level,  // Set userData.level as the default value in the form
      });
    }
  }, [userData, reset]);

  const togglePasswordVisibilityCurr = useCallback(() => {
    setShowCurrPassword((prev) => !prev);
  }, []);

  const togglePasswordVisibilityNew = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const togglePasswordVisibilityConf = useCallback(() => {
    setShowConfPassword((prev) => !prev);
  }, []);

  const notify = useCallback((msg, type = "success") => {
    toast[type](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, []);

  const toggleEditMode = useCallback(() => {
    setOnLight(false);
    setEditMode((prev) => !prev);
  }, []);

  const Show_WorkShops = useCallback(() => {
    setShowWS((prev) => !prev);
  }, []);

  const Show_Events = useCallback(() => {
    setShowEvents((prev) => !prev);
  }, []);

  const Change_Options = useCallback(() => {
    setChangeOptions((prev) => !prev);
  }, []);

  const Close = useCallback(() => {
    setOnLight(true);
    setEditMode(false);
    setShowWS(false);
    setShowEvents(false);
  }, []);

  // workshop registration api
  useEffect(() => {
    if (isAuthUser) {
      userRegistrations(
        userAuthName,
        (response) => {
          setRegisteredWorkshopsData(response.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  },[isAuthUser,userAuthName]);

  // Event Registration api
  useEffect(() => {
    if (isAuthUser) {
      EventRegistration(
        userAuthName,
        "get_user_events",
        (response) => {
          const registeredEvents = response.data.filter(
            (event) => event.registered === true
          );
          setRegisteredEventsData(registeredEvents);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }, [isAuthUser, userAuthName]);

  // User Data api
  useEffect(() => {
    UserPageData(
      userAuthName,
      (response) => {
        if (response.message === "Done" && response.user) { 
          setUserData(response.user); 
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.log("Error fetching user data:", error);
        setLoading(false);
      }
    );
  }, [userAuthName]);

  // Check user to edit
  useEffect(() => {
    if (isAuthUser && userAuthName === UserName) {
      setIsUser(true);
      setOnLight(true);
    } else {
        setIsUser(false);
        setOnLight(false);
    }
  },[isAuthUser,userAuthName]);

  const onSubmit_ProfileSec = useCallback(
    (data) => {
      data.gender = userData.gender;  
      UserPageUpdate(
        data,
        (response) => {
          if (response.message === "Done") {
            setUserData(response.user);
            setEditMode(false);
            setIsValidData(false);
            setOnLight(true);
            notify("Data updated!");
          } else if (response.message === "Not valid data") {
            notify("Not valid data", "error");
            setIsValidData(true);
          }
        },
        (error) => {
          console.error("ErrorMessage");
        }
      );
    },
    [userData, notify]
  );

  const onSubmit_PassSec = useCallback(
    (data) => {
      const { current_password, new_password } = data;
      UpdatePassword(
        current_password,
        new_password,
        (response) => {
          if (response.message === "Wrong Password") {
            notify("Wrong Password", "error");
          } else {
            notify("Password Updated Successfully");
            setEditMode(false);
          }
        },
        (error) => {
          console.error("ErrorMessage");
        }
      );
    },
    [notify]
  );

  const RemoveWS_Register = useCallback(
    (WS_Name) => {
      registerWorkShop(
        WS_Name,
        "unregister",
        (response) => {
          setRegisteredWorkshopsData((prevData) =>
            prevData.filter((item) => item.pk !== WS_Name)
          );
          notify("Workshop Unregistered");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    [notify]
  );

  //? For the closing of the menu
  const menuRef = useRef(null);
  // const handleClickOutside = useCallback((event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setShowEvents((prev) => !prev);
  //     // setShowEvents(false)
  //     setEditMode(false)
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [handleClickOutside]);

  const levelOptions = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
    { value: '6', label: 'Level 6' },
    { value: '7', label: 'Level 7' },
    { value: 'Graduate', label: 'Graduate' },
  ];


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#6c63ff' : '#ced4da', 
      boxShadow: state.isFocused ? '0 0 0 1px #6c63ff' : null, 
      backgroundColor: '#eee',
      height: '45px', 
      marginTop: '10px', 
      outline: 'none',
      border: 'none',
      borderRadius: '5px', 
      fontSize: '16px', 
      
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
      ? '#6c63ff'
      : state.isFocused
      ? '#6c63ff'
      : null,
      color: state.isSelected  ? '#fff' : '#212529', 
      color: state.isFocused  ? '#fff' : '#212529', 
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, 
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d', 
      marginBottom: '15px',
      fontSize: '15px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#495057',
      marginBottom: '15px',
      fontSize: '15px',
    }),
  };

 
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
              {/* <img src={userImage} alt="User Image" /> */}
              < ImageEncode imageUrl={userData.photo}/>

              <h1 className="user_name">{`${userData.first_name || ""} ${
                userData.last_name || ""
              }`}</h1>
              <div className="icons">
                {isUser
                  ? registeredWorkshopsData.length != 0 && (
                      <div className="notify_WS">
                        {registeredWorkshopsData.length}
                      </div>
                    )
                  : ""}
                {isUser ? (
                  <img
                    src={userSaveIcon}
                    alt="User Save Icon"
                    onClick={Show_WorkShops}
                  />
                ) : (
                  ""
                )}
                {isUser
                  ? registeredEventsData.length != 0 && (
                      <div className="notify_E">
                        {registeredEventsData.length}
                      </div>
                    )
                  : ""}
                {isUser ? (
                  <img
                    src={userIcon}
                    alt="User Save Icon"
                    onClick={Show_Events}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="user_details">
              <div className="personal_data">
                <h1 className="detail_sec">Personal Details</h1>
                <h3 className="info_sec">Name</h3>
                <h2 className="user_data">{`${userData.first_name || ""} ${
                  userData.last_name || ""
                }`}</h2>
                <h3 className="info_sec">Gender</h3>
                <h2 className="user_data">
                  {(userData.gender === "M" ? "Male" : "Female") || "N/A"}
                </h2>
                <h3 className="info_sec">Position</h3>
                <h2 className="user_data">{userData.position || "Participant"}</h2>
                <h3 className="info_sec">University</h3>
                <h2 className="user_data">{userData.university || "N/A"}</h2>
                <h3 className="info_sec">College</h3>
                <h2 className="user_data">{userData.collage}</h2>
                <h3 className="info_sec">Level</h3>
                <h2 className="user_data">{`Level ${
                  userData.level || "N/A"
                }`}</h2>
              </div>

              <div className="contact_details">
                <h1 className="detail_sec">Contact Details</h1>
                <h3 className="info_sec">Phone Number</h3>
                <h2 className="user_data">{userData.phone || "N/A"}</h2>
                <h3 className="info_sec">Email</h3>
                <h2 className="user_data">{userData.email || "N/A"}</h2>
              </div>
            </div>
          </div>

          <div className="edit_sec">
            <div className="lamp_img">
              <img src={lampImg} alt="Lamp Image" />
              <img
                src={lightImg}
                alt="Light Image"
                className={`Light ${onLight ? "on" : "off"}`}
              />
            </div>
            <div>
              {isUser ? (
                <button className="btn" onClick={toggleEditMode}>
                  Edit
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* For Edit */}
        {editMode && (
          <div className="bk show" ref={menuRef}>
            <div className="userEdit_container">
              <div className="edit_form">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="close_img"
                  onClick={Close}
                >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
                <div className="edit_title">Update my information</div>

                <div className="options_select">
                  <button
                    className={!changeOptions ? "active" : ""}
                    onClick={Change_Options}
                  >
                    Profile
                  </button>
                  <button
                    className={changeOptions ? "active" : ""}
                    onClick={Change_Options}
                  >
                    Password
                  </button>
                </div>

                <div className="Profile_Sec_Form">
                  <form
                    onSubmit={handleSubmit(onSubmit_ProfileSec)}
                    className={changeOptions ? "temp_form" : ""}
                  >
                    <div className="update_container">
                      <div className="user_input">
                        <p className="input_title">First Name</p>

                        <Controller
                          name="first_name"
                          defaultValue={userData.first_name}
                          rules={{
                            minLength: {
                              value: 3,
                              message: "Must be at least 3 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z_ ]+$/,
                              message: "Not a valid name",
                            },
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              error={Boolean(errors?.first_name?.message)}
                              placeholder="First name"
                              {...field}
                            />
                          )}
                        />
                        {errors?.first_name?.message && (
                          <span className="alert">
                            {errors?.first_name?.message} *
                          </span>
                        )}
                      </div>

                      <div className="user_input">
                        <p className="input_title">Last Name</p>

                        <Controller
                          name="last_name"
                          defaultValue={userData.last_name}
                          rules={{
                            minLength: {
                              value: 3,
                              message: "Must be at least 3 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z_ ]+$/,
                              message: "Not a valid name",
                            },
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              value={userData.last_name}
                              error={Boolean(errors?.last_name?.message)}
                              placeholder="Last name"
                              {...field}
                            />
                          )}
                        />
                        {errors?.last_name?.message && (
                          <span className="alert">
                            {errors?.last_name?.message} *
                          </span>
                        )}
                      </div>

                      <div className="user_input">
                        <p className="input_title">University</p>

                        <Controller
                          name="university"
                          defaultValue={userData.university}
                          rules={{
                            minLength: {
                              value: 3,
                              message: "Must be at least 3 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9_ ]+$/,
                              message: "Not a valid name",
                            },
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              error={Boolean(errors?.university?.message)}
                              placeholder="University"
                              {...field}
                            />
                          )}
                        />
                        {errors?.university?.message && (
                          <span className="alert">
                            {errors?.university?.message} *
                          </span>
                        )}
                      </div>

                      <Controller
                        name="photo"
                        defaultValue={userData.gender === 'M' ? "Male.png" : "Female.png"}
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="hidden"
                            value={userData.gender === 'M' ? "Male.png" : "Female.png"}
                            {...field}
                          />
                        )}
                      />
                      

                      <div className="user_input">
                        <p className="input_title">Collage</p>

                        <Controller
                          name="collage"
                          defaultValue={userData.collage}
                          rules={{
                            minLength: {
                              value: 3,
                              message: "Must be at least 3 characters",
                            },
                            pattern: {
                              value: /^[a-zA-Z0-9-_ ]+$/,
                              message: "Not a valid name",
                            },
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              error={Boolean(errors?.collage?.message)}
                              placeholder="Collage"
                              {...field}
                            />
                          )}
                        />
                        {errors?.collage?.message && (
                          <span className="alert">
                            {errors?.collage?.message} *
                          </span>
                        )}
                      </div>

                <div className="user_input">
                  <span className="reg_detail">Level</span>
                  <Controller
                    name="level"
                    rules={{
                      required: "Level is required",
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Select
                        className="select_level"
                        styles={customStyles}
                        {...field}
                        options={levelOptions}
                        value={levelOptions.find(option => option.value === field.value)} // Controlled by form value
                        placeholder={" Level " + field.value}
                        isSearchable={false}
                        classNamePrefix="react-select"
                        error={fieldState.error}
                        onChange={(selectedOption) => {
                          field.onChange( selectedOption.value );
                        }}
                      />
                    )}
                  />
                  {errors.level && (
                    <span className="alert">{errors.level.message}</span>
                  )}
                </div>

                      <div className="user_input">
                        <p className="input_title">Mobile</p>

                        <Controller
                          name="phone"
                          defaultValue={userData.phone}
                          rules={{
                            maxLength: {
                              value: 13,
                              message: "Must be up to 13 characters",
                            },
                            pattern: {
                              value: /^(01\d{9}|(\+201\d{9}))$/,
                              message: "Not a valid phone number",
                            },
                          }}
                          control={control}
                          render={({ field }) => (
                            <Input
                              error={Boolean(errors?.phone?.message)}
                              placeholder="Phone number"
                              {...field}
                            />
                          )}
                        />
                        {errors?.phone?.message && (
                          <span className="alert">
                            {errors?.phone?.message} *
                          </span>
                        )}
                      </div>

                      <div className="gender_details">
                        <span className="gender_title">Gender</span>
                        {errors.gender && (
                          <span className="alert">{errors.gender.message}</span>
                        )}
                        <div className="gender_box">
                          {userData.gender === "M" ? (
                        
                            <Input
                              id="male"
                              type="radio"
                              {...register("gender")}
                              value="Male"
                              checked
                            />
                          ) : (
                            <Input
                              id="male"
                              type="radio"
                              {...register("gender")}
                              value="Male"
                            />
                          )}

                          <label htmlFor="male">Male</label>

                        </div>

                        <div className="gender_box">
                          {userData.gender === "F" ? (
                            <Input
                              id="female"
                              type="radio"
                              {...register("gender")}
                              value="Female"
                              checked
                            />
                          ) : (
                            <Input
                              id="female"
                              type="radio"
                              {...register("gender")}
                              value="Female"
                            />
                          )}
                          <label htmlFor="female">Female</label>
                        </div>

                      </div>

                      <div className="save_container">
                        <button className="Save_btn" type="submit">
                          Save
                        </button>
                      </div>

                      {isValidData ? (
                        <div className="notValidData">
                          {" "}
                          Data isn't complete{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>
                {/* Password Edit Section */}
                <div className="Password_Sec">
                  <form
                    className={!changeOptions ? "temp_form" : ""}
                    onSubmit={handleSubmit(onSubmit_PassSec)}
                  >
                    <div className="user_input">
                      <p className="input_title">Current Password</p>

                      <Controller
                        name="current_password"
                        rules={{
                          minLength: {
                            value: 8,
                            message: "Must be at least 8 characters",
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="input_container">
                            <Input
                              type={showCurrPassword ? "text" : "password"}
                              error={Boolean(errors?.current_password?.message)}
                              placeholder="*************"
                              {...field}
                            />

                            <span
                              className="hide_show"
                              onClick={togglePasswordVisibilityCurr}
                            >
                              {showCurrPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        )}
                      />
                      {errors?.current_password?.message && (
                        <span className="alert">
                          {errors?.current_password?.message} *
                        </span>
                      )}
                    </div>

                    <div className="user_input">
                      <p className="input_title">New Password</p>

                      <Controller
                        name="new_password"
                        rules={{
                          minLength: {
                            value: 8,
                            message: "Must be at least 8 characters",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]).{8,}$/,
                            message: `Must contain a-z & A-Z & 0-9 & characters`,
                          },
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="input_container">
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              error={Boolean(errors?.new_password?.message)}
                              placeholder="*************"
                              {...field}
                              
                            />

                            <span
                              className="hide_show"
                              onClick={togglePasswordVisibilityNew}
                            >
                              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        )}
                      />
                      {errors?.new_password?.message && (
                        <span className="alert">
                          {errors?.new_password?.message} *
                        </span>
                      )}
                    </div>

                    <div className="user_input">
                      <span className="input_title">Confirm password</span>
                      <Controller
                        name="confirm_password"
                        rules={{
                          // required: "Confirm password is required",
                          validate: (value) =>
                            getValues("new_password") === value ||
                            "Passwords do not match",
                        }}
                        control={control}
                        render={({ field }) => (
                          <div className="input_container">
                            <Input
                              type={showConfPassword ? "text" : "password"}
                              error={Boolean(errors?.confirm_password?.message)}
                              placeholder="*************"
                              {...field}
                            />

                            <span
                              className="hide_show"
                              onClick={togglePasswordVisibilityConf}
                            >
                              {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                          </div>
                        )}
                      />
                      {errors?.confirm_password?.message && (
                        <span className="alert">
                          {errors?.confirm_password?.message} *
                        </span>
                      )}
                    </div>

                    <div className="forget_Section">
                      <p>
                        Don't Remember The Password?{" "}
                        <Link to="/login/forgetPassword">Forget Password</Link>
                      </p>
                    </div>

                    <div className="save_container">
                      <button className="Save_btn" type="submit">
                        Save password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />

        {/* Show the WS Registration */}
        {showWS && registeredWorkshopsData.length > 0 && (
          <div className="bk show">
            <div className="registerSection_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="close_img"
                onClick={Close}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
              <h2 className="model_title">My Workshops</h2>
              {registeredWorkshopsData.map((WS_Data) => (
                <div className="registerSec_card" key={WS_Data.id} ref={menuRef}>
                  <div className="UserRegisterData">
                    <div className="WS_img">
                      <img
                        src={`${DOMAIN}/main/getImage?path=${WS_Data.fields.logo}`}
                        alt=""
                      />
                    </div>
                    <div className="WS_details">
                      <p className="WS_status">
                        Status:
                        <span
                          className={WS_Data.status != "register" && "accept"}
                        >
                          {WS_Data.status === "register" ? (
                            <div className="status-msg">
                              Pending for accepting{" "}
                              <span className="dot-flashing"></span>
                            </div>
                          ) : (
                            "Accepted"
                          )}
                        </span>
                      </p>
                      <p className="WS_pk">{WS_Data.pk} Workshop </p>
                      <p className="WS_title">{WS_Data.fields.description}</p>
                    </div>
                  </div>
                  {WS_Data.status === "register" ? (
                    <button
                      className="remove"
                      onClick={() => RemoveWS_Register(WS_Data.pk)}
                    >
                      X
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show the Event Registration */}
        {showEvents && registeredEventsData.length > 0 && (
          <div className="bk show">
            <div className="registerSection_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="close_img"
                onClick={Close}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
              <h2 className="model_title">My Events</h2>
              {registeredEventsData.map((E_Data) => (
                <div className="registerSec_card" key={E_Data.id}>
                  <div className="UserRegisterData">
                    <div className="WS_img">
                      <img
                        src={`${DOMAIN}/main/getImage?path=${E_Data.fields.logo}`}
                        alt="Image"
                      />
                    </div>
                    <div className="WS_details">
                      <p className="WS_pk">{E_Data.pk} Event </p>
                      <p className="WS_title">{E_Data.fields.description}</p>
                    </div>
                  </div>
                  {/* {E_Data.registered === true ? <button className="remove" onClick={() => RemoveWS_Register(E_Data.pk)}>X</button> : ""} */}
                </div>
              ))}
            </div>
          </div>
        )}

        {showWS && registeredWorkshopsData.length === 0 && (
          <div className="bk show" >
            <div className="registerSection_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="close_img"
                onClick={Close}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
              <div className="noDataMessage">
                Not registered yet to any workshop!
              </div>
            </div>
          </div>
        )}

        {showEvents && registeredEventsData.length === 0 && (
          <div className="bk show" >
            <div className="registerSection_container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="close_img"
                onClick={Close}
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
              <div className="noDataMessage">
                Not registered yet to any Event!
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
