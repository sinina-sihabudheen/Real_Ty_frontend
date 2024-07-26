
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import './App.css'
import AdminRouter from "./routes/AdminRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  return (
    <GoogleOAuthProvider clientId="30022518210-qqkvm7mipcjg5v4onr4nmeksluep5qvb.apps.googleusercontent.com">

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
    </GoogleOAuthProvider>

  );
}

export default App;
