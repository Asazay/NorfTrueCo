import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import LoginFormPage from "../components/LoginFormModal/LoginFormModal";
import SignupFormPage from "../components/SignupFormModal/SignupFormModal";
import Homepage from '../components/Homepage/Homepage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: '/login',
        element: <LoginFormPage/>
      },
      {
        path: '/signup',
        element: <SignupFormPage/>
      }
    ],
  },
]);