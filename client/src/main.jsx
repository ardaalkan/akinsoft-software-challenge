import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux store ve veri kalıcılığı (persist) yapılandırması */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Toast bildirimleri için ToastContainer */}
        <ToastContainer />
        {/* Ana uygulama bileşeni */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
