import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./composants/auth-slice";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import User from "./pages/user";
import "./css/main.css";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") 
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
      if (token && !user) { 
          dispatch(fetchUserProfile(token));
      }
  }, [dispatch, token, user]);
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
