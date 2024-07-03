import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Homepage from '../components/Homepage/Homepage'
import ShopPage from "../components/ShopPage/ShopPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/shop/products/all",
        element: <ShopPage/>
      }
    ],
  },
]);