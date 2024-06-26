import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from './redux/csrf';
import * as sessionActions from './redux/session';
import { RouterProvider } from "react-router-dom";
import { router } from './router';
import { ModalProvider, Modal } from './context/modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
          <Modal />
        </RouterProvider>
      </Provider>
    </ModalProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
