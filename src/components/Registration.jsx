import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Registration.css";
import Header from "./Header.jsx";
function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function signin() {
    navigate("/signin");
  }

  function HandleSubmit() {
    fetch("http://localhost:3000/api/user-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected header name
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          navigate("/signin");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="registration">
      {/* <h1 className="signup">Sign Up</h1> */}
      <Header showAuthButtons={false} />
      <div className="registration-form">
        <input
          placeholder="Enter your name"
          className="enter-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter your email"
          className="enter-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="enter-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={HandleSubmit} className="submit-button">
          Submit
        </button>
        <div>
          Already have an account?&nbsp;<a onClick={signin}>Sign in</a>
        </div>
      </div>
    </div>
  );
}

export default Registration;
