import { useState, useEffect } from "react";
import { GetCookiesAuth } from "../Api/Endpoints/AppEndPoints";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../Auth/authSlice";

const useIsAuthUser = () => {
    const [isAuthUser, setIsAuthUser] = useState(false);
    const [userAuthName, setUserAuthName] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const dispatch = useDispatch();

    useEffect(() => {
        GetCookiesAuth(
            (response) => {
                if (response.message === "Authenticated") {
                    dispatch(setAuthToken({ username: response.user }));
                    setIsAuthUser(true);
                    setUserAuthName(response.user);
                } else if (response.message === "Not Authenticated") {
                    setIsAuthUser(false);
                    setUserAuthName(null);
                }
                setLoading(false); // Authentication check complete, stop loading
            },
            (error) => {
                console.error("Error fetching auth status:", error);
                setIsAuthUser(false);
                setUserAuthName(null);
                setLoading(false); // Error encountered, stop loading
            }
        );
    }, [dispatch]);

    return { isAuthUser, userAuthName, loading, setIsAuthUser };
};

export default useIsAuthUser;
