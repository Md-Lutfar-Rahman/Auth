// Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Sidebar from "./sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    // Ensure the user object is not null before accessing its properties
    if (!user) {
        return <div>Loading...</div>; // Or any other loading indicator/message you prefer
    }

    return (
        <div className="flex py-4 my-4">
            <div>
                <Sidebar></Sidebar>
            </div>
            <div className="w-full">
               <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
