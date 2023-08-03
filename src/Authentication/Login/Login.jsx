import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
  const { createUser,signIn, signInWithGoogle, signInWithGithub, signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    
    const password = form.password.value;
    console.log(email, password);
     
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const role = 'User'; // Set the default role for new users from Google login
        createUser(loggedUser.email, null, role); // Call the createUser function to store the user role in Firestore
        createUserOnServer(loggedUser.email, role , loggedUser.displayName); // Store data into the server when login by Google
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then((result) => {
        const gituser = result.user;
        console.log(gituser);
        const role = 'User'; // Set the default role for new users from GitHub login
        createUser(gituser.email, null, role);
        // Call the createUser function to store the user role in Firestore
        createUserOnServer(gituser.email, role, gituser.displayName); // Store data into the server when login by GitHub
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((result) => {
        const facebookuser = result.user;
        console.log(facebookuser);
        const role = 'User'; // Set the default role for new users from Facebook login
        createUser(facebookuser.email, null, role); // Call the createUser function to store the user role in Firestore
        // Note: Facebook login doesn't provide the user's name, so you can set it to an empty string for now
        createUserOnServer(facebookuser.email, role, facebookuser.displayName,''); // Store data into the server when login by Facebook
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const createUserOnServer = async (email, role, name) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, role, name }),
      });
      const userData = await response.json();
      console.log("User created on server:", userData);
    } catch (error) {
      console.error("Error checking or creating user on server:", error);
    }
  };


  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Please Login!</h1>
        </div>
        <div className="w-full max-w-sm p-6 shadow-xl bg-base-100">
          <form onSubmit={handleLogin} className="mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="label text-xl">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-2 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="label text-xl">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-transparent dark:placeholder-gray-400 dark:text-white dark:focus:ring-2 dark:focus:border-blue-500"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt text-sm link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div>
              <button className="bg-blue-600 text-white rounded-lg w-full mx-auto py-3 text-lg font-semibold">
                Login
              </button>
            </div>
          </form>

          <p className="mb-4">
            <Link to="/register" className="label-text-alt link link-hover">
              New to Auth Master? Please Register
            </Link>
          </p>
          <div>
            <button onClick={handleGoogleSignIn} className="bg-red-600 w-full my-2 py-2 rounded text-white text-lg text-bold">
              Google
            </button>
            <button onClick={handleGithubSignIn} className="bg-gray-600 w-full my-2 py-2 rounded text-white text-lg text-bold">
              Github
            </button>
            <button onClick={handleFacebookSignIn} className="bg-green-600 w-full my-1 py-2 rounded text-white text-lg text-bold">
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
