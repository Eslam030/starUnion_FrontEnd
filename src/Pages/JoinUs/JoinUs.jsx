import { useState, useEffect, useCallback } from "react";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { DOMAIN } from "../../Api/config";
import Logolayout from "../../assets/star_logo2.png";

const JoinUs = () => {
    const navigate = useNavigate();
    const {
      control,
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm({ mode: "onTouched",
      defaultValues: {
        level: "1",
        gender: "Male",
      },
     });

     const onSubmit =  () => {
        console.log("Done");
    };

     
  const levelOptions = [
    { value: '1', label: 'Level 1' },
    { value: '2', label: 'Level 2' },
    { value: '3', label: 'Level 3' },
    { value: '4', label: 'Level 4' },
    { value: '5', label: 'Level 5' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const universityOptions = [
    { value: 'Cairo', label: 'Cairo' },
    { value: 'Helwan', label: 'Helwan' },
    { value: 'Ain-Shams', label: 'Ain-Shams' },
    { value: 'MTI', label: 'MTI' },
    { value: 'Other', label: 'Other' },
  ];

  const facultyOptions = [
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Other', label: 'Other' },
  ];

  const CommitteesOptions = [
    {
      label: 'Technical',
      options: [
        { value: 'web', label: 'Web' },
        { value: 'mobile', label: 'Mobile' },
        { value: 'ai', label: 'AI' },
      ],
    },
    {
      label: 'Non-Technical',
      options: [
        { value: 'hr', label: 'HR' },
        { value: 'social_media', label: 'Social Media' },
        { value: 'pr', label: 'PR' },
        { value: 'graphic_design', label: 'Graphic Design' },
      ],
    },
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
                            <div className="input_box">
                                <span className="reg_detail">Full name</span>
                                <Controller
                                    name="full_name"
                                    rules={{
                                    required: "Full Name is required",
                                    minLength: {
                                        value: 5,
                                        message: "Must be at least 5 characters",
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
                                            defaultValue={genderOptions[0]}
                                            placeholder={"Select Gender"}
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
                                        defaultValue={universityOptions[0]}
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
                                    name="faculty"
                                    rules={{
                                    required: "Faculty is required",
                                    }}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                    <Select
                                        className="select_level"
                                        styles={customStyles}
                                        {...field}
                                        defaultValue={facultyOptions[0]}
                                        options={facultyOptions}
                                        value={facultyOptions.find(option => option.value === field.value)}
                                        placeholder={"Select a Facility"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : '');
                                        }}  
                                    />
                                    )}
                                />
                                {errors.faculty && (
                                    <span className="alert">{errors.faculty.message}</span>
                                )}
                            </div>

                            
                            <div className="input_box">
                                <span className="">Level</span>
                                <Controller
                                    name="Level"
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
                                {errors.Level && (
                                    <span className="alert">{errors.Level.message}</span>
                                )}
                            </div>
                            
                            <div className="input_box">
                                <span className="">Committees</span>
                                <Controller
                                    name="committees"
                                    control={control}
                                    rules={{
                                        required: "Committee selection is required",
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Select
                                        className="select_level"
                                        styles={customStyles}
                                        {...field}
                                        options={CommitteesOptions}
                                        placeholder={"Select a Committee"}
                                        isSearchable={false}
                                        classNamePrefix="react-select"
                                        error={fieldState.error}
                                        onChange={(selectedOption) => {
                                            field.onChange(selectedOption ? selectedOption.value : '');
                                        }}
                                        value={CommitteesOptions.flatMap(group => group.options).find(option => option.value === field.value)}
                                        />
                                    )}
                                    />
                                    {errors.committees && (
                                    <span className="alert">{errors.committees.message}</span>
                                    )}
                            </div>
                        </div>

                        <div className="btn_container">
                            <button className="Register_btn" type="submit">
                                Join
                            </button>
                         </div>
                    </form>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default JoinUs