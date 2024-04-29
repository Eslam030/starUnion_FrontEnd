//? Here All the endpoints
import $ from 'jquery';
import { DOMAIN } from '../config'

// UserPage endpoint to fetch user information
export const UserPageData = (username, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/user/`,
        method: 'GET',
        data: {
            'username': username  
        },
        success: onSuccess,
        error: onError,
    });
};

// UserPage endpoint to update user information

// UserPage endpoint to check user for updates
export const checkUserForChange = (token, username , onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/userForChange/`,
        method: 'GET',
        headers: {
            'Authorization': 'JWT ' + token,
        },
        data: {
            'username' : username,
        },
        success: onSuccess,
        error: onError,
    });
};

// Login endpoint
export const loginPage = (username, email, password , onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/login/`,
        method: 'POST',
        data: {
            'username_or_email': username || email,
            'password': password
        },
        success: onSuccess,
        error: onError
    });
};

// OTP endpoint
// 1) SEND OTP
export const sendOTP = (email, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/sendotp/`,
        method: 'POST',
        data: {
            'email': email
        },
        success: onSuccess,
        error: onError,
    });
};

// 2) CHECK OTP
export const check_OTP = (email, otp, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/otpcheck/`,
        method: 'GET',
        data: {
            'email': email,
            'otpToCheck': otp
        },
        success: onSuccess,
        error: onError
    });
};

// Register endpoint
export const registerPage = (data, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/register/`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: onSuccess,
        error: onError
    });
};

// Event endpoint For all Events
export const eventPages = (onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/event/events/`,
        method: 'GET',
        success: onSuccess,
        error: onError
    })
}

// Workshop endpoint For all workshops
export const workShopPages = (onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/workshop/workshops/`,
        method: 'GET',
        success: onSuccess,
        error: onError
    });
};


// Workshop endpoint For workshop details
export const workShopDetails = (WS_name, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/workshop/workshops/`,
        method: 'GET',
        data: {
            'workshop': WS_name,
          },
        success: onSuccess,
        error: onError
    });
};

// Instructors endpoint
export const instructors = (onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/workshop/instructors/`,
        method: 'GET',
        success: onSuccess,
        error: onError
    });
};

// Tob 5 endpoint
export const Tob5 = (test,onSuccess, onError ) => {
    $.ajax({
        url: `${DOMAIN}/workshop/tob5/`,
        method: 'GET',
        data: {
            'workshop' : 'test'
        },
        success: onSuccess,
        error: onError
    });
};

// ChangePass endpoint
export const changePass = (email, password, onSuccess, onError) => {
    $.ajax({
        url: `${DOMAIN}/main/changepass/`,
        method: 'PUT',
        data: {
            'email' : email, 
            'new' : password,
        },
        success: onSuccess,
        error: onError
    });
};