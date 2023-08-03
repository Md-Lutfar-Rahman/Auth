import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = "User"; // Set the default role for new registrations

    try {
      createUser(email, password).then(async (data) => {
        const loggedUser = data.user;
        console.log(loggedUser);
        form.reset();
        await createUserOnServer(email, role, name);
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
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
          <h1 className="text-5xl font-bold">Please Register!</h1>
        </div>
        <div className="w-full max-w-sm p-6 shadow-xl bg-base-100">
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="label text-xl">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-2 dark:focus:border-blue-500"
                required
              />
            </div>
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
                <Link
                  to="/login"
                  className="label-text-alt text-sm hover:text-blue-500"
                >
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="mt-6">
              <button className="btn btn-primary w-full py-3 text-lg font-semibold">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
