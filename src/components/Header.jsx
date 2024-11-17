// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import hashImage from "./hash-image.jpg";
import "./styles/Header.css"; // Create a separate CSS file for the header
function Header({ showAuthButtons = true, showSavedData = false, email }) {
  const navigate = useNavigate();
  // console.log("Email in header is:", email);
  const EncodedEmail = btoa(email);
  function homepage() {
    navigate("/");
  }
  return (
    <header className="header">
      <div className="image-div">
        <img
          src={hashImage}
          alt="Hash Image"
          onClick={homepage}
          className="hash-image"
        />
      </div>
      <div className="heading">
        <h1>Bcrypt Hash Generator</h1>
      </div>
      <div className="buttons">
        {showAuthButtons && (
          <div className="signup-signin">
            <button className="sign-in" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="sign-up" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <div className="about" onClick={() => navigate("/about")}>
              About
            </div>
          </div>
        )}
        {showSavedData && (
          <div
            onClick={() => navigate(`/saved-user-data/${EncodedEmail}`)}
            className="saveddata-button"
          >
            Saved hashes
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
