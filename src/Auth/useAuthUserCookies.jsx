import { useState, useEffect } from "react";
import { GetCookiesAuth } from "../Api/Endpoints/AppEndPoints";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../Auth/authSlice";

const useIsAuthUser = () => {
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [userAuthName, setUserAuthName] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        GetCookiesAuth(
            (response) => {
                if (response.message === "Authenticated") {
                    dispatch(setAuthToken({ username: response.user }));
                    setIsAuthUser(true);
                    setUserAuthName(response.user);
                } else {
                    setIsAuthUser(false);
                    setUserAuthName(null); 
                }
            },
            (error) => {
                console.error("Error fetching auth status:", error);
                setIsAuthUser(false);
                setUserAuthName(null); 
            }
        );
    }, [dispatch]);

    return { isAuthUser, userAuthName };
};

export default useIsAuthUser;
