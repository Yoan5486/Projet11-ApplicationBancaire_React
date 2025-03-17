import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import User from "./pages/user";
import "./css/main.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="user" element={<User />} />
        </Routes>
      </Router>
  );
}

export default App;
