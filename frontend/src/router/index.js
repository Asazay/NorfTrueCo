import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Homepage from '../components/Homepage/Homepage'
import ShopPage from "../components/ShopPage/ShopPage";
import ItemPage from "../components/ItemPage/ItemPage";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import ConfirmationPage from "../components/ConfirmationPage/ConfirmationPage";
import OrdersPage from "../components/OrdersPage/OrdersPage";
import WishlistPage from "../components/WishlistPage/WishlistPage";
import ShopPageQuery from "../components/ShopPage/ShopPageQuery";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/shop/products",
        element: <ShopPage />
      },
      {
        path: '/shop/products/query/?',
        element: <ShopPageQuery />
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
        path: '/wishlist',
        element: <WishlistPage />
      },
      {
        path: '/forbidden',
        element: <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h1 style={{fontSize: '100px', margin: '0'}}>403</h1>
          <h3>Forbidden</h3>
          <p>Access to this resource denied</p>
        </div>
      },
      {
        path: '*',
        element: <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{fontSize: '100px', margin: '0'}}>404</h1>
        <h3>Page not found {':('}</h3>
      </div>
      }
    ],
  },
]);