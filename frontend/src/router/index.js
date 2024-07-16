import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Homepage from '../components/Homepage/Homepage'
import ShopPage from "../components/ShopPage/ShopPage";
import ItemPage from "../components/ItemPage/ItemPage";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/shop/products/",
        element: <ShopPage />
      },
      {
        path: '/shop/products/:itemId',
        element: <ItemPage />
      },
      {
        path: '/checkout',
        element: <CheckoutPage />
      }
    ],
  },
]);