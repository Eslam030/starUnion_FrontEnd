import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { Input } from "@material-tailwind/react";
import OtpInput from 'react-otp-input';
import { useForm, Controller } from "react-hook-form"
import { DOMAIN } from "../../Api/config";
import $ from 'jquery'; 
import { sendOTP, check_OTP, registerPage } from "../../Api/Endpoints/AppEndPoints"; // api
// Images
import Logolayout from "../../assets/star_logo.png";
import registerImg from "../../assets/register_img.png";
// CSS file
import "./Register.css";


const Register = () => {

  const navigate = useNavigate();
  const { control, register ,handleSubmit ,formState: { errors }, getValues} = useForm({mode:'onTouched'})
  
  const [userEmail, setUserEmail] = useState()
  const [otp, setOtp] = useState()
  const [classShow, setClassShow] = useState("");
  const [message, setMessage] = useState(""); // State to store message
  const [isMessageError, setIsMessageError] = useState(false); 
  const [timer, setTimer] = useState(0);
  const [registrationData, setRegistrationData] = useState({});
  const [gender, setGender] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);


  const checkUsernameOrEmailUnique = async (username, email) => {
    try {
      const response = await $.ajax({
        url: `${DOMAIN}/main/checkuser/`,
        method: 'GET',
        data: { username, email }
      });

      if (response.message === "Username Exists") {
        setMessage("Username already exists");
        setIsMessageError(true);
        return false;
      } else if (response.message === "Email Exists") {
        setMessage("Email already exists");
        setIsMessageError(true);
        return false;
      }
      setIsMessageError(false);
      return true;
    } catch (error) {
      console.error("Error checking username or email:", error);
      setMessage("Error checking username or email.");
      setIsMessageError(true);
      return false;
    }
  };

  const send_the_otp = (email) => {
    sendOTP(email, 
      (response) => {
          console.log(response['message']);
          setMessage("OTP sent successfully. Check your email.");
          setIsMessageError(false);
          setTimer(50);
    },
      (error) => {
          console.log(error);
          setMessage("Failed to send OTP. Please try again.");
          setIsMessageError(true);
    }
  )
  }

  const onSubmit = async (data) => {
    const { Confirm_password, ...cleanData } = data;
  
    // Check username and email uniqueness before sending OTP
    const isUnique = await checkUsernameOrEmailUnique(data.username, data.email);
    if (!isUnique) return;
    setIsMessageError(false);
    if(!isMessageError) {
      console.log("Proceeding with unique username and email:", cleanData);
      setRegistrationData(cleanData);
      setUserEmail(cleanData.email);
      send_the_otp(cleanData.email);
      setClassShow("show");

    }
  };

  const checkOTP = () => {
    check_OTP(userEmail, otp, "register", 
      (response) => {
          console.log(response.message);
          if (response.message == "Done") {
            setMessage("OTP verified successfully!");
            setIsMessageError(false);
            sendRegistrationData(registrationData);
          } else {
            setMessage("Invalid OTP. Please try again.");
            setIsMessageError(true);
          }
      },
      (error) => {
          console.error(error);
          setMessage("Error verifying OTP. Please try again.");
          setIsMessageError(true);
      }
  
    )

  };  

  const sendRegistrationData = (data) => {
    registerPage(data , 
      (response) => {
          console.log("Registration successful:", response);
          navigate('/login');
    },
      (error) => {
          console.error("Registration failed:", error);
          setMessage("Registration failed. Please try again.");
          setIsMessageError(true);
    }
  )
};


  
  return (
    <>
    <div className="body">
      <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>

      <div className="register">
        <div className="form_container">
          <div className="reg_title">Become A Star</div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user_reg">
              
              <div className="input_box">
                <span className="reg_detail">First Name</span>
                <Controller
                  name="first_name"
                  rules={{
                    required: "First Name is required",
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
                  render={({ field }) => (<Input  error={Boolean(errors?.first_name?.message)} placeholder="John" {...field}/>)}
                />
                {errors?.first_name?.message && <span className="alert">{errors?.first_name?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">Last Name</span>
                <Controller
                  name="last_name"
                  rules={{
                    required: "Last Name is required",
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
                  render={({ field }) => (<Input  error={Boolean(errors?.last_name?.message)} placeholder="Doe" {...field}/>)}
                />
                  {errors?.last_name?.message && <span className="alert">{errors?.last_name?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">Nickname</span>
                <Controller
                  name="username"
                  rules={{
                    required: "Nickname is required",
                    minLength:{
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_ ]+$/,
                        message: "Not a valid name",
                      }
                  }}
                  control={control}
                  render={({ field }) => (<Input  error={Boolean(errors?.username?.message)} placeholder="Doe" {...field}/>)}
                />
                  {errors?.username?.message && <span className="alert">{errors?.username?.message} *</span>}
                  <span className="alert">{message == "Username already exists" ? "Username already exists" : "" }</span>
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
                      value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ,
                      message: "Not a valid email",
                    }
                  }}
                  render={({ field }) => (<input error={Boolean(errors?.email?.message)} placeholder="Johndoe123@example.com" {...field}/>)}
                />
                {errors?.email?.message && <span className="alert">{errors?.email?.message} *</span>}
                <span className="alert">{message == "Email already exists" ? "Email already exists" : "" }</span>
              </div>

              <div className="input_box">
                <span className="reg_detail">Phone</span>
                <Controller
                  name="phone"
                  rules={{
                    required: "Phone is required",
                    maxLength:{
                        value: 11,
                        message: "Must be 11 numbers",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Not a valid phone",
                      }
                  }}
                  control={control}
                  render={({ field }) => (<Input  error={Boolean(errors?.phone?.message)} placeholder="+20 123 456 7891" {...field}/>)}
                />
                {errors?.phone?.message && <span className="alert">{errors?.phone?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">Password</span>
                <Controller
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength:{
                        value: 8,
                        message: "Must be at least 8 characters",
                      },
                      
                  }}
                  control={control}
                  render={({ field }) => (<Input type="password" error={Boolean(errors?.password?.message)} placeholder="*************" {...field}/>)}
                />
                {errors?.password?.message && <span className="alert">{errors?.password?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">Confirm password</span>
                <Controller
                  name="Confirm_password"
                  rules={{
                    required: "Confirm password is required",
                    validate: (value) => getValues("password") === value || "Passwords do not match",
                  }}
                  control={control}
                  render={({ field }) => (<Input type="password"  error={Boolean(errors?.Confirm_password?.message)} placeholder="*************" {...field}/>)}
                />
                {errors?.Confirm_password?.message && <span className="alert">{errors?.Confirm_password?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">University</span>
                <Controller
                  name="university"
                  rules={{
                    required: "University is required",
                    minLength:{
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z_ ]+$/,
                        message: "Not a valid name",
                      }
                  }}
                  control={control}
                  render={({ field }) => (<Input  error={Boolean(errors?.university?.message)} placeholder="Cairo University" {...field}/>)}
                />
                {errors?.university?.message && <span className="alert">{errors?.university?.message} *</span>}
              </div>

              <div className="input_box">
                <span className="reg_detail">Collage</span>
                <Controller
                  name="collage"
                  rules={{
                    required: "Collage is required",
                    minLength:{
                        value: 3,
                        message: "Must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z_ ]+$/,
                        message: "Not a valid name",
                      }
                  }}
                  control={control}
                  render={({ field }) => (<Input  error={Boolean(errors?.collage?.message)} placeholder="Computers and Artificial intelligence" {...field}/>)}
                />
                {errors?.collage?.message && <span className="alert">{errors?.collage?.message} *</span>}
              </div>

              <Controller
                  name="photo"
                  defaultValue={5}
                  control={control}
                  render={({ field }) => (<Input type="hidden" value="5"  error={Boolean(errors?.collage?.message)} placeholder="Computers and Artificial intelligence" {...field}/>)}
                />
                

              {/* ================================= */}
              <div className="input_box">
                <span className="reg_detail">Level</span>
                <Controller
                  name="level"
                  rules={{
                    required: "Level is required",
                    pattern: {
                      value: /^\d+$/, // This regex matches only numeric inputs
                      message: "Level must be an integer" // Custom error message
                    }
                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input {...field} error={fieldState.error} list="Levels" placeholder="Select a Level" type="number"/>
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
                {errors.level && <span className="alert">{errors.level.message}</span>}
              </div>

              {/* ================================= */}
              

            </div>
            <div className="gender_details">
              <span className="gender_title">Gender</span>
              {errors.gender && <span className="alert">{errors.gender.message}</span>}
              <div className="gender_box">
                <Input id="male" type="radio"{...register("gender")} value="Male"/>
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender_box">
                <Input id="female" type="radio" {...register("gender", {required: "Gender is Required"} )} value="Female"/>
                <label htmlFor="female">Female</label>
              </div>
            </div>
           

            <div className="btn_container">
                <button className="Register_btn" type="submit" >
                    Register
                </button>
            </div>
            
          </form>
        </div>

      <div className="register_img">
          <img src={registerImg} alt="Register Image" />
      </div>
    </div>

    <div className={`${classShow} show_otp_card`}>
      <div className={`otp_card`}>
        <h1>OTP Verification</h1>
        <p>Code has been send to your email</p>
        <div className="otp_card_inputs">
        <OtpInput
          value={otp}
          onChange={setOtp}
          otpType="number"
          autoFocus
          className="otp_card_inputs"
          numInputs={6}
          renderInput={(props) => <input  {...props}/> }>
        </OtpInput>
        </div>
        <p className="status_msg">{message && <span className={isMessageError ? "error_message" : "success_message"}>{message}</span>}</p>
        <p>Didn't get the otp <button onClick={() => send_the_otp(userEmail)} disabled={timer > 0} className="resend_link">{timer > 0 ? `Please wait ${timer} seconds` : 'Resend'}</button></p>
        <button onClick={checkOTP}  type="submit" className="verify_btn">Verify</button>

      </div>
    </div>

  </div>
</>
  );
};

export default Register;
