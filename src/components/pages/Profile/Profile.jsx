// import React from 'react';

import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
// import { Link } from "react-router-dom";

const Profile = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div> 
            Display User Email {user.email} <br/>
            Display User Name : {user.displayName}<br/>
            Display User Photo : <img src={user.photoURL} alt="" /><br/>


        </div>
    );
};

export default Profile;