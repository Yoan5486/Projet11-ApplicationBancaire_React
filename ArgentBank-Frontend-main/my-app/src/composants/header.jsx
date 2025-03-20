import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUsername } from "./auth-slice";
import logo from "../img/argentBankLogo.webp";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isUserPage = location.pathname === "/user";
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.firstName || "");

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/home");
  }
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveUsername = (e) => {
    e.preventDefault();
    if (newUsername.trim() !== "") {
      dispatch(updateUsername(newUsername));
      setIsEditing(false);
    }
  };

  return (
    <nav className={`main-nav ${isUserPage ? "user-nav" : ""}`}>
      <Link className="main-nav-logo" to="/home">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (
          <>
           {isEditing ? (
              <form onSubmit={handleSaveUsername} className="edit-username-form">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </form>
            ) : (
            <a className="main-nav-item" onClick={handleEditClick} style={{ cursor: "pointer" }}>
              <i className="fa fa-user-circle"></i> {user.firstName + " "} {/* le dire au mentor,pas normal ce genre de trucs */}
            </a>
            )}
            <Link className="main-nav-item" to="/home" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;