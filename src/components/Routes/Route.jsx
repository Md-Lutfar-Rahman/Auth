import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home/Home";
import Layout from "../../Layouts/FrontEnd/Layout";
import Login from "../../Authentication/Login/Login";
import Register from "../../Authentication/Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import PrivateRoute from "../../AuthProvider/PrivateRoute";
import User from "../pages/Users/User";
import Profile from "../pages/Profile/Profile";
import MyPixels from "../pages/MyPixels/MyPixels";
import BuyPixel from "../pages/BuyPixel/BuyPixel";
import ManagePixel from "../pages/ManagePixel/ManagePixel";
import Edit from "../Dashboard/pages/User/Edit";
import PixelsPayment from "../Dashboard/pages/pixel/PixelsPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: "<p>This is from the error page</p>",
    children: [
      {
        path: '/',
        element: <Home></Home>,
        errorElement: "<p>This is from the error page</p>",
      },
      
      {
        path: '/login',
        element: <Login />,
        errorElement: "<p>This is from the error page</p>"
      },
      {
        path: '/register',
        element: <Register />,
        errorElement: "<p>This is from the error page</p>"
      }
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>, // Wrap the Dashboard component with PrivateRoute
    errorElement: "<p>This is from the error page</p>",
    children:[
      {
        path:'/dashboard/users',
        element:<User></User>
      },
      {
        path:'/dashboard/users/edit/:id',
        element:<PrivateRoute><Edit></Edit> </PrivateRoute>
      },
      {
        path:'/dashboard/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'/dashboard/mypixels',
        element:<PrivateRoute><MyPixels></MyPixels></PrivateRoute>
      },
      {
        path:'/dashboard/buy-pixels',
        element:<PrivateRoute><BuyPixel></BuyPixel></PrivateRoute>
      },
      {
        path:'/dashboard/manage-pixels/:id',
        element:<PrivateRoute><ManagePixel></ManagePixel></PrivateRoute>
      },
      {
        path:'/dashboard/paymentStatus',
        element:<PrivateRoute> <PixelsPayment></PixelsPayment> </PrivateRoute>
      }
    ]
  }
]);
