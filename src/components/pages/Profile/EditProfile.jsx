// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const EditProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
             {user.email}   
        </div>
    );
};

export default EditProfile;