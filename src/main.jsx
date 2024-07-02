import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="614359146389-1ibea34vmh7al388n8jvcbtf330fenau.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
