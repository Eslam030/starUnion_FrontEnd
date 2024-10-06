// Close Path 
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"; 

const CloseJoinUs = ({ children }) => {

    const IsJoinUsBtn  = useSelector((state) => state.auth.IsJoinUsSelector)

    if(IsJoinUsBtn === false) {
        return <Navigate to={`/`}  replace  />;
      }

  return children

}

export default CloseJoinUs