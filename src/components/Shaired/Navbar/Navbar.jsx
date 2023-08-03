import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => console.error(error))
  }

  return (
    <div className="bg-yellow-600 text-white text-1xl py-3">
      <div className="flex gap-3 justify-between px-16">
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="relative">
          <button
            className="btn btn-ghost normal-case text-xl"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            My Account
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded shadow-md">
              {user ? (
                <div className="w-48 bg-blue-500 text-white">
                 <Link className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"  to={'/dashboard'}>Dashboard</Link>
                  <div className="flex justify-between items-center hover:bg-gray-100 px-2">
                  <Link className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100" to="/dashboard/profile">Profile</Link>
                  <img className="rounded-full w-8 h-8" src={user.photoURL}/>
                  </div>
                  
                  <button
                    onClick={handleLogOut}
                    className=" bg-red-600 block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-600"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div>
                  <Link className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" to="/login">Login</Link>
                  <Link className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100" to="/register">Register</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
