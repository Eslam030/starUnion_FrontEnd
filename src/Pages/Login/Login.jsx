import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { loginPage } from "../../Api/Endpoints/AppEndPoints"; // api
import { setAuthToken } from "../../Auth/authSlice"; // For store the token and username
import LogIllustrator from "../../assets/login-illustrator.svg";
import Logolayout from "../../assets/star_logo.png";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
  const [message, setMessage] = useState("");  // Store response messages
  const [isError, setIsError] = useState(false); // Track if the message is an error
  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const onSubmit = useCallback((data) => {
    loginPage(data.username, data.email, data.password, 
      (response) => {
        if (response.message === "done") {
          setMessage("Login successful! Redirecting...");
          dispatch(setAuthToken({ token: response.access, username: response.user }));
          setIsError(false);
          navigate(location.state?.previousUrl || '/');
        } else {
          setMessage("Login failed: " + response.message);
          setIsError(true);
        }
      },
      (error) => {
        setMessage("Server error, please try again later.");
        setIsError(true);
      }
    );
  }, [dispatch, navigate]);

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
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
              <Controller
                name="username"
                rules={{
                  required: "Username is required",
                }}
                control={control}
                render={({ field }) => (
                  <Input error={Boolean(errors?.username?.message)} placeholder="User Name Or Email" {...field} />
                )}
              />
              {errors?.username?.message && <span className="alert-log">{errors?.username?.message} *</span>}
            </div>

            <div className="form">
              <Controller
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
                control={control}
                render={({ field }) => (
                  <div className="input_container">
                    <Input type={showPassword ? 'text' : 'password'} error={Boolean(errors?.password?.message)} placeholder="Password" {...field} />
                    <span className='hide_show login_icon' onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                )}
              />
              {errors?.password?.message && <span className="alert-log">{errors?.password?.message} *</span>}
            </div>
            <p>Forget Password? <Link to="/login/forgetPassword" className="register_link">Forget</Link></p>      
            <p>Don't have an account? <Link to="/register" className="register_link">Register</Link> </p>
            <button className="Log_btn">Log In</button>
          </form>
          {message && <div className={isError ? "error_message_log" : "success_message_log"}>{message}</div>}
        </div>

        <div className="log_img">
          <img src={LogIllustrator} alt="Login Illustrator" />
        </div>
      </div>
    </>
  );
};

export default Login;
