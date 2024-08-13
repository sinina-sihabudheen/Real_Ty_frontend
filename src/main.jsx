import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/Store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { Toaster } from "sonner";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '@fortawesome/fontawesome-free/css/all.min.css';



const stripePromise = loadStripe('pk_test_51PeAv3GYaADgjXW8SBDpSToR8TtuB29Hi5loSI4lQpi3zDc7zpZxrZiYxv6EDHiMffNmvsebBgpx0cCAyxLHiiDV00Xz1y0bpm'); 

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render( 
    <ErrorBoundary>
      <GoogleOAuthProvider clientId="30022518210-qqkvm7mipcjg5v4onr4nmeksluep5qvb.apps.googleusercontent.com">
        <Provider store={store}>
        <Toaster />
        <Elements stripe={stripePromise}>
          <React.StrictMode>
          <App />
          </React.StrictMode>
        </Elements>
        </Provider>
      </GoogleOAuthProvider>
    </ErrorBoundary>
 
);

