import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser, fetchUserProfile } from "../composants/auth-slice";
import "../css/main.css";
import Header from "../composants/header";
import Footer from "../composants/footer";


const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const result = await dispatch(loginUser({ email, password, rememberMe })).unwrap();
      console.log("📥 Réponse complète de l'API Login :", result); 
      console.log("✅ Token reçu après connexion :", result.token);

      if (result.token) {
       await dispatch(fetchUserProfile(result.token)).unwrap(); 
      }
      setHasAttemptedLogin(false);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setHasAttemptedLogin(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/user" />;
  }

  return (
    <>
     <Header />
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle"></i>
        <h1>Sign In</h1>
        {hasAttemptedLogin && error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail (e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me"  checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default SignIn;