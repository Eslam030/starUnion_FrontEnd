// Close Path 
import { Navigate } from 'react-router-dom';
import useIsAuthUser from './useAuthUserCookies';

const CloseAuth = ({ children }) => {
  const {isAuthUser} = useIsAuthUser(); 

    if (isAuthUser) {
      return <Navigate to={`/`}  replace  />;
    }
  
    return children; 
}

export default CloseAuth;
