import React from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import FeatureItem from "../composants/feature-item";
import logo from "../img/argentBankLogo.webp";
import iconChat from "../img/icon-chat.webp";
import iconMoney from "../img/icon-money.webp";
import iconSecurity from "../img/icon-security.webp";


const Home = () => {
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="./home">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="./sign-in.jsx">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            icon={iconChat}
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            icon={iconMoney}
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            icon={iconSecurity}
            title="Security you can trust"
            description="We use top-of-the-line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Home;