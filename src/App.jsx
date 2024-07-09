
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import './App.css'
import AdminRouter from "./routes/AdminRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRouter />} />
          <Route path="*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
