import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Homepage from '../components/Homepage/Homepage'
import ShopPage from "../components/ShopPage/ShopPage";
import ItemPage from "../components/ItemPage/ItemPage";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import ConfirmationPage from "../components/ConfirmationPage/ConfirmationPage";
import OrdersPage from "../components/OrdersPage/OrdersPage";

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
      },
      {
        path: '/confirmation/?',
        element: <ConfirmationPage />
      },
      {
        path: '/orders',
        element: <OrdersPage />
      },
      {
        path: '/forbidden',
        element: <h1>403 Forbidden</h1>
      },
      {
        path: '*',
        element: <h1>404 Page Not found</h1>
      }
    ],
  },
]);