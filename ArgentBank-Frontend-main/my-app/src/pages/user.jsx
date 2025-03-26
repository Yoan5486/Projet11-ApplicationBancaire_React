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
  const [newUsername, setNewUsername] = useState(user?.userName || "");

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleEditClick = () => {
    setNewUsername(""); 
    setIsEditing(true);
  };

  const handleSaveUsername = async (e) => {
    e.preventDefault();
     if (newUsername.trim() !== "" && newUsername !== user?.userName) {
      try {
        await dispatch(updateUserProfile({ userName: newUsername })).unwrap(); 
        dispatch(fetchUserProfile());
       
      } catch (error) {
        console.error("Erreur lors de la mise à jour du nom d'utilisateur :", error);
      }
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
                    placeholder={user?.userName || "Enter new username"} 
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
              <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
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