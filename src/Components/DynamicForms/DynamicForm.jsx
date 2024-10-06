import { Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import Select from "react-select";

const DynamicForm = ({ formData, register, control, errors }) => {

  if (!formData || !Array.isArray(formData.formFields)) {
    return null; 
  }



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

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <div className="input_box" key={field.name}>
            <span className="reg_detail">{field.label}</span>
            <Controller
              name={field.name}
              control={control}
              rules={{
                required: field.validation.required && `${field.label} is required`,
                minLength: field.validation.minLength && {
                  value: field.validation.minLength,
                  message: `Must be at least ${field.validation.minLength} characters`,
                },
                pattern: field.validation.pattern && {
                  value: new RegExp(field.validation.pattern),
                  message: field.validation.errorMessage,
                }
              }}
              render={({ field: controllerField }) => (
                <Input
                  placeholder={field.placeholder}
                  {...controllerField}
                  error={Boolean(errors[field.name]?.message)}
                />
              )}
            />
            {errors[field.name]?.message && (
              <span className="alert">{errors[field.name]?.message}</span>
            )}
          </div>
        );

      case 'textarea':
          return (
            <div key={field.name} style={{width: "100%"}}>
              <span className="reg_detail">{field.label}</span>
              <Controller
                name={field.name}
                control={control}
                rules={{
                  required: field.validation.required && `${field.label} is required`,
                  minLength: field.validation.minLength && {
                    value: field.validation.minLength,
                    message: `Must be at least ${field.validation.minLength} characters`,
                  }
                }}
                render={({ field: controllerField }) => (
                  <textarea
                    placeholder={field.placeholder}
                    {...controllerField}
                    className="joinUsTextArea"
                  />
                )}
              />
              {errors[field.name]?.message && (
                <span className="alert">{errors[field.name].message}</span>
              )}
            </div>
          );

      case 'radio':
        return (
          <div className="input_box" key={field.name}>
            <span className="reg_detail">{field.label}</span>
            {field.options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  {...register(field.name, { required: field.validation.errorMessage })}
                  value={option.value}
                />
                {option.label}
              </label>
            ))}
            {errors[field.name] && <span className="alert">{errors[field.name].message}</span>}
          </div>
        );

      case 'select':
        return (
          <div className="input_box" key={field.name}>
            <span className="reg_detail">{field.label}</span>
            <Controller
              name={field.name}
              control={control}
              rules={{
                  required: field.validation.required && field.validation.errorMessage,
                }}
                render={({ field: controllerField }) => (
                <Select
                  styles={customStyles}
                  className="select_level"
                  options={field.options}
                  {...controllerField}
                  placeholder={field.placeholder}
                  classNamePrefix="react-select"
                  isSearchable={false}
                  error={field.validation.errorMessage}
                  value={field.options.find(option => option.value === controllerField.value)}
                  onChange={(selectedOption) => controllerField.onChange(selectedOption.value)} 
                />
              )}
            />
            {errors[field.name] && <span className="alert">{errors[field.name].message}</span>}
          </div>
        );
      
      case 'url':
          return (
            <div className="input_box" key={field.name}>
              <span className="reg_detail">{field.label}</span>
              <Controller
                name={field.name}
                control={control}
                rules={{
                  required: field.validation.required && `${field.label} is required`,
                  pattern: field.validation.pattern && {
                    value: new RegExp(field.validation.pattern),
                    message: field.validation.errorMessage,
                  },
                }}
                render={({ field: controllerField }) => (
                  <Input
                    type="url"
                    placeholder={field.placeholder}
                    {...controllerField}
                    error={Boolean(errors[field.name]?.message)}
                  />
                )}
              />
              {errors[field.name]?.message && (
                <span className="alert">{errors[field.name]?.message}</span>
              )}
            </div>
          );
      
      case 'file':
      return (
        <div className="input_box " key={field.name}>
          <span className="reg_detail">{field.label}</span>
          <Input
            type="file"
            {...register(field.name, { required: field.validation.required })}
          />
          {errors[field.name] && <span className="alert">{errors[field.name].message}</span>}
        </div>
      );
      
      default:
        return null;
    }
  };
  return (
    <>
        {formData.formFields.map(field => renderField(field))}
    </>

  )
}

export default DynamicForm