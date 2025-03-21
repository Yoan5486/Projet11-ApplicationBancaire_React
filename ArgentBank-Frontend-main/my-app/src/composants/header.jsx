import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkAuth } from "./auth-slice";
import logo from "../img/argentBankLogo.webp";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isUserPage = location.pathname === "/user";

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }
  const handleLogoClick = () => {
    if (isAuthenticated) {
      handleLogout();
    }
  };

  return (
    <nav className={`main-nav ${isUserPage ? "user-nav" : ""}`}>
      <Link className="main-nav-logo" to="/" onClick={handleLogoClick}>
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
              <a className="main-nav-item">
                <i className="fa fa-user-circle"></i> {user.firstName + " "} {/* le dire au mentor,pas normal ce genre de trucs */}
              </a>
            <Link className="main-nav-item" to="/" onClick={handleLogout}>
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