import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    if(user){
        return(
            children
        )
    }
    return (
        <Navigate to="/login" replace={true}></Navigate>
    );
};

export default PrivateRoute;