import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import AccountItem from "../composants/account-item";
import Transactions from "../data/account-item.json"
import { fetchUserProfile, updateUserProfile } from "../composants/auth-slice";
import "../css/main.css";
import Header from "../composants/header";
import Footer from "../composants/footer";

const User = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.firstName || "");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSaveUsername = (e) => {
    e.preventDefault();
    if (newUsername.trim() !== "") {
      dispatch(updateUserProfile({ firstName: newUsername, lastName: user.lastName }));
      setIsEditing(false);
    }
  };


  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          {isEditing ? (
            <div className="edit-user-container">
              <h2>Edit user info</h2>
              <form onSubmit={handleSaveUsername} className="edit-user-form">
                <div className="direction-row">
                  <label>User name:</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="direction-row">
                  <label>First name:</label>
                  <input type="text" value={user?.firstName} disabled />
                </div>
                <div className="direction-row">
                  <label>Last name:</label>
                  <input type="text" value={user?.lastName} disabled />
                </div>
                <div className="edit-save-buttons">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <h1>
                Welcome back<br />{user?.firstName} {user?.lastName}!
              </h1>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
            </>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        {Transactions.map((data) => (
          <AccountItem
            key={data.id}
            title={data.title}
            amount={data.amount}
            description={data.description}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default User;