import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import  store  from './redux/Store.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
         <Provider store={store}>
         <GoogleOAuthProvider clientId="30022518210-qqkvm7mipcjg5v4onr4nmeksluep5qvb.apps.googleusercontent.com">
         <App />
         </GoogleOAuthProvider>
          
        </Provider>
    </React.StrictMode>
);
