import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { DOMAIN } from "../../Api/config";
import { ToastContainer, toast } from "react-toastify";
import { registerSpacialEvent, eventPages, checkSpacialEventsRouts } from "../../Api/Endpoints/AppEndPoints"; // api
// Images
import Logolayout from "../../assets/star_logo.png";
import DotpyImg from '../../assets/dotpyi 1.png'
import './EventForm.css'



const EventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //Set this variables in global to use it in two different functions
  const pathname = location.pathname
  const eventName = decodeURIComponent(pathname.split('/').pop()) 
  const companyName = decodeURIComponent(pathname.split('/').slice(2,3))


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

  const [events, setEvents] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [message, setMessage] = useState(""); // State to store message

  useEffect(() => {
    checkSpacialEventsRouts(companyName, eventName, 
      (response) => {
        if (response.message !== 'Done') {
          navigate('/Errorpage')
        }
      }, 
      (error) => {
        console.error(error)
      }
    )
  }, [checkSpacialEventsRouts])

  const onSubmit = (data) => {
    registerSpacialEvent(
      data,eventName,
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

  useEffect(()=> {
    eventPages(
      (response) => {
        const specialEvent = response.data.filter(ev => ev.special === true); 
        const filteredEvents = specialEvent
          .filter(ev => ev.pk === eventName) 
          .map(ev => ({
            pk: ev.pk,
            logo: ev.form_logo,
          }));
        setEvents(filteredEvents)
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    )
  }, [])


  return (
    <>
      <div className="body">
        <div className="logoLayout register-LOGO">
          <Link to="/">
            <img src={Logolayout} alt="Logo" />
          </Link>
        </div>

        <div className="register event_form">
          <div className="form_container">
            <div className="reg_title">{events.map((e) => e.pk)}
            </div>

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
                        placeholder="+20 123 456 7891"
                        {...field}
                      />
                    )}
                  />
                  {errors?.phone?.message && (
                    <span className="alert">{errors?.phone?.message} *</span>
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
          <div className="register_img spacialEventsImg">
            <img src={DotpyImg} alt="" className="dotpy_img" style={{width: '180px'}}/>
            <img src={`${DOMAIN}/main/getImage?path=${events.map(e => e.logo)}`} alt="Register Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventForm;
