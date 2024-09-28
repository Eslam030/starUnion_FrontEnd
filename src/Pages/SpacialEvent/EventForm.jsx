import { useState, useEffect, useCallback } from "react";
import Select from 'react-select';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { registerSpacialEvent, eventPages, checkSpacialEventsRouts } from "../../Api/Endpoints/AppEndPoints"; 
// Images
import Logolayout from "../../assets/star_logo2.png";
// import DotpyImg from '../../assets/dotpyi 1.png'
import './EventForm.css'



const EventForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //Set this variables in global to use it in two different functions
  const pathname = location.pathname
  const eventName = decodeURIComponent(pathname.split('/').pop()) 
  const companyName = decodeURIComponent(pathname.split('/').slice(2,3))

  const [events, setEvents] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [message, setMessage] = useState("");


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched",
    defaultValues: {
      level: "1",
      gender: "Male", // Set default value for level
    },
   });
 
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
        if (response.message === 'Done') {
            notify('Registered Successfully')
            setTimeout(() => {
              navigate("/events");
            }, 2000)
        } else {
          notify('You are already registered', 'error')
        }
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

  const levelOptions = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
    { value: 'other', label: 'Other' },
  ];
  
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#6c63ff' : '#ced4da', 
      boxShadow: state.isFocused ? '0 0 0 1px #6c63ff' : null, 
      backgroundColor: '#fff',
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
    menuList: (provided) => ({
      ...provided,
      maxHeight: '120px', 
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
                        value: /^[a-zA-Z_ ]+$/,
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
                        value: /^[a-zA-Z_ ]+$/,
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
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
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
                        value: /^[a-zA-Z0-9_ ]+$/,
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

                <div className="input_box">
                  <span className="reg_detail">Collage</span>
                  <Controller
                    name="collage"
                    rules={{
                      required: "Collage is required",
                      pattern: {
                        value: /^[a-zA-Z0-9-_ ]+$/,
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
                    }}
                    control={control}
                    render={({ field, fieldState }) => (
                      <Select
                        className="select_level"
                        styles={customStyles}
                        {...field}
                        options={levelOptions}
                        defaultValue={levelOptions[0]}
                        placeholder={"Select Level"}
                        isSearchable={false}
                        classNamePrefix="react-select"
                        error={fieldState.error}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption ? selectedOption.value : '');
                        }}
                        value={levelOptions.find(option => option.value === field.value)}
                      />
                    )}
                  />
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
                      <Select
                        className="select_level"
                        styles={customStyles}
                        {...field}
                        options={genderOptions}
                        defaultValue={genderOptions[0]}
                        placeholder={"Gender"}
                        isSearchable={false}
                        classNamePrefix="react-select"
                        error={fieldState.error}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption ? selectedOption.value : '');
                        }}
                        value={genderOptions.find(option => option.value === field.value)}
                      />
                    )}
                  />
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
          {/* <div className="register_img spacialEventsImg">
            <img src={DotpyImg} alt="" className="dotpy_img" style={{width: '180px'}}/>
            <img src={`${DOMAIN}/main/getImage?path=${events.map(e => e.logo)}`} alt="Register Image" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default EventForm;
