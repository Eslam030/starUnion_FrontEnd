// Close Path 
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"; 

const CloseSpecialEvent = ({ children }) => {

    const spacialEventPassed  = useSelector((state) => state.auth.spacialEventPassed)

    if(spacialEventPassed) {
        return <Navigate to={`/`}  replace  />;
      }

  return children

}

export default CloseSpecialEvent