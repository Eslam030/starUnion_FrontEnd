import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { DOMAIN } from "../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import { registerSpacialEvent } from "../../Api/Endpoints/AppEndPoints"; // api
// Images
import Logolayout from "../../assets/star_logo.png";
import Event_Img from "../../assets/AI_Event.png";


const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

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

  const [userEmail, setUserEmail] = useState();
  const [message, setMessage] = useState(""); // State to store message

  const onSubmit = (data) => {
    registerSpacialEvent(
      data,
      (response) => {
        notify('Registered Successfully')
        setTimeout(() => {
          navigate("/events");
        }, 2000)
      },
      (error) => {
        console.error("Registration failed:", error);
        setMessage("Registration failed. Please try again.");
        setIsMessageError(true);
      }
    );
  };

  return (
    <>
      <div className="body">
        <div className="logoLayout register-LOGO">
          <Link to="/">
            <img src={Logolayout} alt="Logo" />
          </Link>
        </div>

        <div className="register">
          <div className="form_container">
            <div className="reg_title">AI Catalyst</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user_reg">
                <div className="input_box">
                  <span className="reg_detail">First Name</span>
                  <Controller
                    name="first_name"
                    rules={{
                      required: "First Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Not a valid name",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.first_name?.message)}
                        placeholder="John"
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

                <div className="input_box">
                  <span className="reg_detail">Last Name</span>
                  <Controller
                    name="last_name"
                    rules={{
                      required: "Last Name is required",
                      minLength: {
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Not a valid name",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.last_name?.message)}
                        placeholder="Doe"
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

                <div className="input_box">
                  <span className="reg_detail">Email</span>
                  <Controller
                    name="email"
                    onChange={setUserEmail}
                    value={userEmail}
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "Not a valid email",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        error={Boolean(errors?.email?.message)}
                        placeholder="Johndoe123@example.com"
                        {...field}
                      />
                    )}
                  />
                  {errors?.email?.message && (
                    <span className="alert">{errors?.email?.message} *</span>
                  )}
                  <span className="alert">
                    {message == "Email already exists"
                      ? "Email already exists"
                      : ""}
                  </span>
                </div>

                <div className="input_box">
                  <span className="reg_detail">Phone</span>
                  <Controller
                    name="phone"
                    rules={{
                      required: "Phone is required",
                      validate: (value) => {
                        const isValid = /^[0-9]{11}$|^[+]?[0-9]{13}$/.test(
                          value
                        );
                        return (
                          isValid || "Phone number must be 11 or 14 digits long"
                        );
                      },
                      pattern: {
                        value: /^[+0-9]+$/,
                        message: "Not a valid phone",
                      },
                    }}
                    control={control}
                    render={({ field }) => (
                      <Input
                        error={Boolean(errors?.phone?.message)}
                        placeholder="+20 123 456 7891"
                        {...field}
                        maxLength={13}
                      />
                    )}
                  />
                  {errors?.phone?.message && (
                    <span className="alert">{errors?.phone?.message} *</span>
                  )}
                </div>

                <div className="input_box">
                  <span className="reg_detail">University</span>
                  <Controller
                    name="university"
                    rules={{
                      required: "University is required",
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
                        error={Boolean(errors?.university?.message)}
                        placeholder="Cairo University"
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

                <div className="input_box" style={{ marginLeft: "40px" }}>
                  <span className="reg_detail">Collage</span>
                  <Controller
                    name="collage"
                    rules={{
                      required: "Collage is required",
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
                        error={Boolean(errors?.collage?.message)}
                        placeholder="Computers and Artificial intelligence"
                        {...field}
                      />
                    )}
                  />
                  {errors?.collage?.message && (
                    <span className="alert">{errors?.collage?.message} *</span>
                  )}
                </div>


                <div className="input_box">
                  <span className="reg_detail">Level</span>
                  <Controller
                    name="level"
                    rules={{
                      required: "Level is required",
                      pattern: {
                        value: /^[1-7]$/, // This regex matches only numeric inputs
                        message: "Level must be an integer between 1 and 7", // Custom error message
                      },
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        error={fieldState.error}
                        list="Levels"
                        placeholder="Select a Level"
                        type="number"
                        min="1"
                        max="7"
                      />
                    )}
                  />
                  <datalist id="Levels">
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                    <option value="5">Level 5</option>
                    <option value="6">Level 6</option>
                    <option value="7">Level 7</option>
                    {/* <option value="other" /> */}
                  </datalist>
                  {errors.level && (
                    <span className="alert">{errors.level.message}</span>
                  )}
                </div>

                <div className="input_box">
                  <span className="reg_detail">Gender</span>
                  <Controller
                    name="gender"
                    rules={{
                      required: "Gender is required",
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        error={fieldState.error}
                        list="Gender"
                        placeholder="Gender"
                        type="text"
                      />
                    )}
                  />
                  <datalist id="Gender">
                    <option value="Male"></option>
                    <option value="Female"></option>
                    {/* <option value="other" /> */}
                  </datalist>
                  {errors.gender && (
                    <span className="alert">{errors.gender.message}</span>
                  )}
                </div>
              </div>

              <div className="btn_container">
                <button
                  className="Register_btn"
                  type="submit"
                  style={{ marginTop: "15px" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        <ToastContainer />
          <div className="register_img">
            <img src={Event_Img} alt="Register Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
