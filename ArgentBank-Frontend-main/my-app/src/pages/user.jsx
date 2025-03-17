import React, { useState } from "react";
import AccountItem from "../composants/account-item"; 
import "../css/main.css";

    const sharedAccounts = [
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

      const users = [
        {
          id: 1,
          firstName: "Tony",
          lastName: "Stark",
          email: "tony@stark.com",
          password: "password123",
          accounts: sharedAccounts, // Référence aux mêmes comptes
        },
        {
          id: 2,
          firstName: "Steve",
          lastName: "Rogers",
          email: "steve@rogers.com",
          password: "password456",
          accounts: sharedAccounts, // Même référence ici
        },
      ];
    
      function User() {
        const [selectedUser] = useState(users[0]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />{selectedUser.firstName} {selectedUser.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>

      {selectedUser.accounts.map((account) => (
        <AccountItem
        key={account.id}
        title={account.title}
        amount={account.amount}
        description={account.description}
      />
      ))}
    </main>
  );
}

export default User;
