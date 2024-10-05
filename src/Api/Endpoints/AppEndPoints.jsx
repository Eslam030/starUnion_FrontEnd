// Here All the endpoints
import $ from "jquery";
import { DOMAIN } from "../config";

// UserPage endpoint to fetch user information
export const UserPageData = (username, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/user/`,
    method: "GET",
    data: {
      username: username,
    },
    success: onSuccess,
    error: onError,
  });
};

// UserPage endpoint to update user information
export const UserPageUpdate = (data, onSuccess, onError) => {
  $.ajax({
    url: DOMAIN + "/main/updateData/",
    method: "PUT",
    xhrFields: {
        withCredentials: true 
    },
    data: data,
    success: onSuccess,
    error: onError,
  });
};

// UserPage endpoint to check user for updates
export const checkUserForChange = (username, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/userForChange/`,
    method: "GET",
    xhrFields: {
      withCredentials: true 
    },
    data: {
      username: username,
    },
    success: onSuccess,
    error: onError,
  });
};

// Login endpoint
export const loginPage = (username, email, password, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/login/`,
    method: "POST",
    xhrFields: {
      withCredentials: true  
    },
    data: {
      username_or_email: username || email,
      password: password,
    },
    success: onSuccess,
    error: onError,
  });
};

// OTP endpoint
// 1) SEND OTP
export const sendOTP = (email, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/sendotp/`,
    method: "POST",
    data: {
      email: email,
    },
    success: onSuccess,
    error: onError,
  });
};

// 2) CHECK OTP
export const check_OTP = (email, otp, op, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/otpcheck/`,
    method: "GET",
    xhrFields: {
      withCredentials: true  
    },
    data: {
      email: email,
      otpToCheck: otp,
      operation: op,
    },
    success: onSuccess,
    error: onError,
  });
};

// Register endpoint
export const registerPage = (data, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/register/`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: onSuccess,
    error: onError,
  });
};

// Event endpoint For all Events
export const eventPages = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/events/`,
    method: "GET",
    success: onSuccess,
    error: onError,
  });
};

// Event endpoint For Registration to event
export const registerEvent = ( op, event_name, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/registerevent/`,
    method: "POST",
    xhrFields: {
      withCredentials: true,
    },
    data: {
      operation: op,
      event: event_name,
    },
    success: onSuccess,
    error: onError,
  });
};

// Event endpoint For Registration  Special Event
export const registerSpacialEvent = (data, event_name ,onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/registerevent/`,
    method: "POST",
    data: {
      data: JSON.stringify(data),
      event: event_name,
      special: "true",
    },
    success: onSuccess,
    error: onError,
  });
};

// Check routes for spacial events
export const checkSpacialEventsRouts = (companyName, eventName, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/checkroute/`,
    method: 'GET',
    data : {
        'company' : companyName ,
        'event' : eventName,
    } , 
    success: onSuccess,
    error: onError,
  });
}


// Event endpoint For Registration
export const EventRegistration = (username, op, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/events/`,
    method: "GET",
    data: {
      username: username,
      operation: op,
    },
    success: onSuccess,
    error: onError,
  });
};

// Workshop endpoint For all workshops
export const workShopPages = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/workshops/`,
    method: "GET",
    success: onSuccess, 
    error: onError,
  });
};

// Workshop endpoint For Registration to workshop
export const registerWorkShop = (WS_name, op, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/registerwork/`,
    method: "POST",
    xhrFields: {
        withCredentials: true  
    },
    data: {
      workshop: WS_name,
      form: '"{}"',
      operation: op,
    },
    success: onSuccess,
    error: onError,
  });
};

// Workshop endpoint For Registration
export const userRegistrations = (username, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/workshops/`,
    method: "GET",
    data: {
      username: username,
    },
    success: onSuccess,
    error: onError,
  });
};

// Workshop endpoint For workshop details
export const workShopDetails = (WS_name, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/workshops/`,
    method: "GET",
    data: {
      workshop: WS_name,
    },
    success: onSuccess,
    error: onError,
  });
};

// Instructors endpoint
export const instructors = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/instructors/`,
    method: "GET",
    success: onSuccess,
    error: onError,
  });
};

// Tob 5 endpoint
export const Tob5 = (WS_name, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/workshop/top5/`,
    method: "GET",
    data: {
      workshop: WS_name,
    },
    success: onSuccess,
    error: onError,
  });
};

// ChangePass endpoint
export const changePass = (token, email, password, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/changepass/`,
    method: "PUT",
    xhrFields: {
        withCredentials: true  
    },
    data: {
      email: email,
      new: password,
    },
    success: onSuccess,
    error: onError,
  });
};

// Update pass endpoint
export const UpdatePassword = (
  curr_pass,
  new_pass,
  onSuccess,
  onError
) => {
  $.ajax({
    url: `${DOMAIN}/main/changepass/`,
    method: "PUT",
    xhrFields: {
          withCredentials: true 
      },
    data: {
      current: curr_pass,
      new: new_pass,
    },
    success: onSuccess,
    error: onError,
  });
};

// Sponsors endpoint
export const Get_Sponsors = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/event/sponsors/`,
    method: "GET",
    success: onSuccess,
    error: onError,
  });
};

// Check for user auth or not
export const GetCookiesAuth = (onSuccess,onError) => {
  $.ajax({
    url: DOMAIN + '/main/checkauthentication/',
    method: 'GET',
    xhrFields: {
        withCredentials: true  
    },
    success: onSuccess,
    error: onError,
  })
}

// join us endpoint
export const joinUsRegister = (data, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/joinus/`,
    method: "POST",
    data: data,
    processData: false,   
    contentType: false,   
    success: onSuccess,
    error: onError,
  });
}

// check join us btn endpoint
export const IsJoinUsBtn = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/featurechecker/`,
    method: "GET",
    data: {
      feature: "join_us",
    },
    success: onSuccess,
    error: onError,
  });
}

// Get the availability of committees
export const GetAvailabilityCommittees = (onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/getavailablecommittees/`,
    method: "GET",
    success: onSuccess,
    error: onError,
  });

}

// Get the JoinUs form 
export const GetJoinUsForm = (FormQus, onSuccess, onError) => {
  $.ajax({
    url: `${DOMAIN}/main/getformtemplate/`,
    method: "GET",
    data: {
      form_name : FormQus,
    },
    success: onSuccess,
    error: onError,
  });
} 
