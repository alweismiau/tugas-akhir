import { createBrowserRouter, Navigate } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import TestMBTI from "../pages/mbti/MBTI"; 
import { isAuthenticated } from "../auth";

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signin" />;
};

export const Router = createBrowserRouter([
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
    children: [
      { path: "mbti-test", element: <PrivateRoute element={<TestMBTI />} /> }, 
    ],
  },
  { path: "*", element: <Navigate to="/signin" replace /> },
]);