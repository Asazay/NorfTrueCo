import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "./context/modal";
import { thunkAuthenticate } from "./redux/session";
import Navigation from "./components/Navigation/Navigation";
import { createContext, useContext } from "react";

const CartContext = createContext({
});

export const useCartContext = () => useContext(CartContext)

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState(null)

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation />
        {isLoaded &&
          <Outlet/>
        }
        <Modal />
      </ModalProvider>
    </>
  );
}