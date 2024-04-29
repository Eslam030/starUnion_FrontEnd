import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form"
import OtpInput from 'react-otp-input';   
import { sendOTP, check_OTP, changePass } from '../../Api/Endpoints/AppEndPoints'; // api
// Image
import Logolayout from "../../assets/star_logo.png";
// CSS file
import './Forget.css'


const Forget = () => {
  // const token = useSelector((state) => state.auth.token)
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({mode:'onTouched'});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");  // Store response messages
  const [isMessageError, setIsMessageError] = useState(false); 
  const [isDone, setIsDone] = useState(false); // Track if the message is an error
  const [timer, setTimer] = useState(0);
  const [userEmail, setUserEmail] = useState()
  const [otp, setOtp] = useState()
  const [classShow, setClassShow] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

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


  const onSubmit = (data) => {
    if (!otpVerified) {
        setUserEmail(data.email);
        setClassShow("show");
        send_the_otp(data.email);
    } else {
        updatePassword(data);
    }
};


const updatePassword = (data) => {
  const { password, email } = data;
  changePass(email, password ,
    (response) => {
      navigate('/login');
    },
    (error) => {
      setMessage("Failed to update password. Please try again.");
      setIsMessageError(true);
    }
  )  
};


  const checkOTP = () => {
    check_OTP(userEmail, otp, 
      (response) => {
        if (response.message == "Done") {
          setMessage("OTP verified successfully!");
          setClassShow("close");
          setIsMessageError(false);
          setOtpVerified(true);
        } else {
          setMessage("Invalid OTP. Please try again.");
          setIsMessageError(true);
          setIsDone(false)
        }
      },
      (error) => {
        setMessage("Error verifying OTP. Please try again.");
        setIsMessageError(true);
        setOtpVerified(false);
      }
    
    )
  };
  
  return (
    <>
        <div className="logoLayout">
        <Link to="/">
          <img src={Logolayout} alt="Logo" />
        </Link>
      </div>
    
    <div className="forget_pass">
      <div className="forget_form">
        <div className="form_card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="forget_title">
              <h1>Forget Password</h1>
            </div>

            <div className="forget_input">
              <Controller
                name="email"
                control={control}
                rules={{ 
                  required: "Email is required" 
                }}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Email" className="input_field" error={Boolean(errors?.email?.message)}/>
                )}
                />
                {errors?.email?.message && <span className="alert_forget">{errors?.email?.message} *</span>}
            </div>

          
          {otpVerified && (
                                <>
                                    <div className="forget_input">
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{
                                                required: "New Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Must be at least 8 characters",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} type="password" placeholder="New Password" className="input_field" error={Boolean(errors?.password?.message)} />
                                            )}
                                        />
                                        {errors?.password?.message && <span className="alert_forget">{errors?.password?.message} *</span>}
                                    </div>
                                    <div className="forget_input">
                                        <Controller
                                            name="Confirm_password"
                                            control={control}
                                            rules={{
                                                validate: (value) => getValues("password") === value || "Passwords do not match",
                                            }}
                                            render={({ field }) => (
                                                <Input {...field} type="password" placeholder="Confirm Password" className="input_field" error={Boolean(errors?.Confirm_password?.message)} />
                                            )}
                                        />
                                        {errors?.Confirm_password?.message && <span className="alert_forget">{errors?.Confirm_password?.message} *</span>}
                                    </div>
                                </>
                            )}

            <div className="forget_button">
              <button type="submit"> Submit</button>
            </div>
          </form>
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
  )
}

export default Forget