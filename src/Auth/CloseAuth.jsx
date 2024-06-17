// Close Path 
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using Redux to store auth state

// Pass children as a prop to allow CloseAuth to wrap other components
const CloseAuth = ({ children }) => {
    // const username = useSelector(state => state.auth.username)
    const location = useLocation();
    const isAuthenticated = useSelector(state => state.auth.token); // Check auth state from Redux
  
    if (isAuthenticated) {
      return <Navigate to={`/`} state={{ from: location }} replace  />;
    }
  
    return children; // If not authenticated, show the component that was passed in
}

export default CloseAuth;
