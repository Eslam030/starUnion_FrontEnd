import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import Logolayout from "../../assets/star_logo2.png";
import joinUs_img from "../../assets/joinUs.png";
import { joinUsRegister, GetAvailabilityCommittees, GetJoinUsForm } from "../../Api/Endpoints/AppEndPoints";
import { useCallback, useEffect, useState } from 'react';
import DynamicForm from '../../Components/DynamicForms/DynamicForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const JoinUs = () => {
    const [step, setStep] = useState(1);
    const [dynamicValues, setDynamicValues] = useState({})
    const [committeesOptions, setCommitteesOptions] = useState([]);  
    const [formData, setFormData] = useState({});
    const [selectedCommittee, setSelectedCommittee] = useState(null);
    const steps = [1, 2];

    const handleStepClick = (newStep) => {
        if (newStep < step) {
          setStep(newStep); // Allow going back
        }
      };

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

    const navigate = useNavigate();
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm({ mode: "onTouched",

     });

    const committeeLabelMapping = {
      'WEB': 'Web',
      'MOB': 'Mobile',
      'AI': 'AI',
      'HR': 'HR',
      'SM': 'Social Media',
      'PR': 'PR',
      'GD': 'Graphic Design',
      'PV': 'Photographing & Video'
    };

  const technicalCommittees = ['WEB', 'MOB', 'AI'];
  const nonTechnicalCommittees = ['HR', 'SM', 'PR', 'GD', 'PV'];

  // Get Availability Committees 
  useEffect(() => {

    GetAvailabilityCommittees(
        (response) => {
            const technical = [];
            const nonTechnical = [];

            response.committees.forEach((committee) => {
                const label = committeeLabelMapping[committee.committee_name] || committee.committee_name;  
                const option = { 
                    value: committee.committee_name, 
                    label, 
                    formName: committee.committee_form_name 
                };

                if (technicalCommittees.includes(committee.committee_name)) {
                    technical.push(option);
                } else if (nonTechnicalCommittees.includes(committee.committee_name)) {
                    nonTechnical.push(option);
                }
            });

            setCommitteesOptions([
                {
                    label: 'Technical',
                    options: technical,
                },
                {
                    label: 'Non-Technical',
                    options: nonTechnical,
                }
            ]);
        },
        (error) => {
            console.error('Error:', error);
        }
    );
}, []);

    const handleCommitteeChange = (selectedOption) => {
      setSelectedCommittee(selectedOption);

      const formName = selectedOption.formName;

      // Call GetJoinUsForm to fetch the dynamic form
      GetJoinUsForm(formName, 
          (response) => {
            setFormData(response.form)
          },
          (error) => {
              console.error("Error fetching form:", error);
          }
      );
  };

    const sendJoinUsForm = (data) => {
      joinUsRegister(data,
        (response) => {
          if(response.message === 'Done') {
            notify("Submitted Successfully!");
            setTimeout(() => {
              navigate('/'); 
            }, 2000)
          }
          
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    };
    
    const onSubmit = (data) => {
      if (step === 1) {
        if (Object.keys(errors).length === 0) {
          setStep(2);
          setDynamicValues(data);
        } else {
          console.log('Errors:', errors);
        }
      } else if (step === 2) {
        const dynamicFormValues = getValues();
    
        const secondFormValues = Object.fromEntries(
          Object.entries(dynamicFormValues).filter(
            ([key]) => !(key in dynamicValues) && key !== 'file'
          )
        );
  
        const finalData = new FormData();
        Object.keys(data).forEach(subKey => {
          finalData.append(subKey, data[subKey]);
        });
        // Append the file from secondFormValues if it exists
        if (dynamicFormValues.file) {
          finalData.append('file', dynamicFormValues.file[0]); 
        }

        let SecondFormTemp =  {}
        Object.keys(secondFormValues).forEach(subKey => {
          if (!Array.isArray(secondFormValues[subKey])) { 
            SecondFormTemp[subKey] = secondFormValues[subKey];
          }
        });
        finalData.append('additional_questions', JSON.stringify(SecondFormTemp))
    
        sendJoinUsForm(finalData);
      }
    };

      
  const levelOptions = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
  ];

  const genderOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
  ];

  const universityOptions = [
    { value: 'Cairo', label: 'Cairo' },
    { value: 'Helwan', label: 'Helwan' },
    { value: 'Ain-Shams', label: 'Ain-Shams' },
    { value: 'Other', label: 'Other' },
  ];

  const facultyOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Other', label: 'Other' },
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
        <div className="register">
            <div className="form_container">
                <div className="reg_title">Join Us </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="user_reg">
                            {step === 1 && (
                          <>
                            <div className="input_box">
                                <span className="reg_detail">Full name</span>
                                <Controller
                                    name="full_name"
                                    rules={{
                                    required: "Full Name is required",
                                    minLength: {
                                        value: 6,
                                        message: "Must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z-_ ]+$/,
                                        message: "Remove special characters or numbers ",
                                    },
                                    }}
                                    control={control}
                                    render={({ field }) => (
                                    <Input
                                        error={Boolean(errors?.full_name?.message)}
                                        placeholder="John Doe"
                                        {...field}
                                    />
                                    )}
                                />
                                {errors?.full_name?.message && (
                                    <span className="alert">
                                    {errors?.full_name?.message} *
                                    </span>
                                )}
                            </div>

                            <div className="input_box">
                                <span className="reg_detail">Email</span>
                                <Controller
                                    name="email"
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
                                    <span className="reg_detail">Gender</span>
                                    <Controller
                                        name="Gender"
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
                                            placeholder={"Select a Gender"}
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
                                    {errors.Gender && (
                                        <span className="alert">{errors.Gender.message}</span>
                                    )}
                            </div>

                            <div className="input_box">
                                <span className="reg_detail">University</span>
                                <Controller
                                    name="university"
                                    rules={{
                                    required: "University is required",
                                    }}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <Select
                                        className="select_level"
                                        styles={customStyles}
                                        {...field}
                                        options={universityOptions}
                                        value={universityOptions.find(option => option.value === field.value)} // Controlled by form value
                                        placeholder={"Select University"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                        field.onChange( selectedOption.value );
                                        }}
                                    />
                                    )}
                                />
                                {errors.university && (
                                    <span className="alert">{errors.university.message}</span>
                                )}
                            </div>
                            
                            <div className="input_box">
                                <span className="reg_detail">Faculty</span>
                                <Controller
                                    name="collage"
                                    rules={{
                                    required: "Faculty is required",
                                    }}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <Select
                                        className="select_level"
                                        styles={customStyles}
                                        {...field}
                                        options={facultyOptions}
                                        value={facultyOptions.find(option => option.value === field.value)}
                                        placeholder={"Select a Faculty"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : '');
                                        }}  
                                    />
                                    )}
                                />
                                {errors.collage && (
                                    <span className="alert">{errors.collage.message}</span>
                                )}
                            </div>
                            
                            <div className="input_box">
                                <span className="">Level</span>
                                <Controller
                                    name="level_select"
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
                                        placeholder={"Select a Level"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : '');
                                        }}  
                                    />
                                    )}
                                />
                                {errors.level_select && (
                                    <span className="alert">{errors.level_select.message}</span>
                                )}
                            </div>

                            <div className="input_box" style={{marginBottom: "40px"}}>
                                <span className="">Committees</span>
                                <Controller
                                    name="committee"
                                    control={control}
                                    rules={{
                                        required: "Committee selection is required",
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Select
                                        className="select_level"
                                        styles={customStyles}
                                        {...field}
                                        options={committeesOptions}
                                        placeholder={"Select a Committee"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                          const selectedValue = selectedOption ? selectedOption.value : ''; 
                                          field.onChange(selectedValue);  
                                          handleCommitteeChange(selectedOption);
                                      }}
                                        value={committeesOptions
                                          .flatMap(group => group.options)
                                          .find(option => option.value === field.value)}
                                        />
                                    )}
                                    />
                                    {errors.committee && (
                                    <span className="alert">{errors.committee.message}</span>
                                    )}
                            </div>
                                </>
                            )}
                            {step === 2 && (
                              <>
                                  <DynamicForm formData={formData} register={register} control={control} errors={errors} />
                              </>
                            )}

                        </div>
 
                        <div className="btn_container">
                            <button className="Register_btn" type="submit">
                                {step === 1 ? 'Next' : 'join'}
                            </button>
                         </div>

                         <div className="pagination_circles">
                            {steps.map((s, index) => (
                            <div
                                key={index}
                                className={`circle ${step === s ? 'active' : ''}`}
                                onClick={() => handleStepClick(s)}
                            />
                            ))}
                         </div>
                    </form>
                    <ToastContainer />
            </div>
            <div className="register_img">
                <img src={joinUs_img} alt="JoinUs Image" />
            </div>
        </div>
    </div>

    
    </>
  )
}

export default JoinUs