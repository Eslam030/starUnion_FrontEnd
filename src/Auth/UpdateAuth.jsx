import $ from 'jquery';
import { DOMAIN } from '../Api/config'
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "../Auth/authSlice"; 

export const UpdateAuth = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const expirationTime = 20;
    const currentTime = new Date().getTime() / 1000;
    if (expirationTime && currentTime > expirationTime) {
        // Token expired, update it
        $.ajax({
          url: DOMAIN + '/main/updateToken/',
          method: 'POST',
          headers: {
            'Authorization': 'JWT ' + token,
          },
          success: function (response) {
            if (response.access != null) {
              access = response.access;
              dispatch(setAuthToken({token: response.access}));
            }
            console.log(response['modified']);
          },
          error: function (error) {
            console.log(error);
          }
        });
      } 
}

export const updateAuthIfNeeded = () => {
    return (dispatch) => {
        UpdateAuth(dispatch);
    };
};
