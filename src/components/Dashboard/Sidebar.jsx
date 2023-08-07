import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Sidebar = () => {
    const { logOut, user } = useContext(AuthContext);
    const userRole = "admin";

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }

    return (
        <div className="bg-gray-800 h-screen w-32 flex py-8 mr-4">
            <div className="flex flex-col items-start py-4 px-4">
                {
                    (userRole === 'admin' && user.email === "lutfarrahmaninfo@gmail.com") ? (
                        <>
                            <Link to={'/'} className='text-white text-1xl mb-2 block'>Home</Link>
                            <Link to={'/dashboard/users'} className='text-white text-1xl mb-2 block'>Users</Link>
                           
                            <Link to={'/dashboard/payment'} className='text-white text-1xl mb-2 block'>Payment Status</Link>
                            <Link to={'/dashboard/support-tickets'} className='text-white text-1xl mb-2 block'>Support Tikets</Link>
                            
                        </>
                    ) : (
                            <>
                                <Link to={'/'} className='text-white text-1xl mb-2 block'>Home</Link>
                                <Link to={'/dashboard/profile'} className='text-white text-1xl mb-2 block'>Profile</Link>
                                <Link to={'/dashboard/mypixels'} className='text-white text-1xl mb-2 block'>My Pixels</Link>
                                <Link to={'/dashboard/buy-pixels'} className='text-white text-1xl mb-2 block'>Buy New Pixels</Link>
                               
                            </>
                        )
                }
                <button
                    onClick={handleLogOut}
                    className="bg-red-600 block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-600 rounded-md"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
