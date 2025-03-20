import React from "react"
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";;
import AccountItem from "../composants/account-item"; 
import "../css/main.css";
import Header from "../composants/header";
import Footer from "../composants/footer";

const User = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
    const Accounts = [
        {
          id: 1,
          title: "Argent Bank Checking (x8349)",
          amount: "$2,082.79",
          description: "Available Balance",
        },
        {
          id: 2,
          title: "Argent Bank Savings (x6712)",
          amount: "$10,928.42",
          description: "Available Balance",
        },
        {
          id: 3,
          title: "Argent Bank Credit Card (x8349)",
          amount: "$184.30",
          description: "Current Balance",
        },
      ];

  return (
    <>
     <Header />
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />{user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>

      {Accounts.map((account) => (
        <AccountItem
        key={account.id}
        title={account.title}
        amount={account.amount}
        description={account.description}
      />
      ))}
    </main>
    <Footer />
    </>
  );
}

export default User;
