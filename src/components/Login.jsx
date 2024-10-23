import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import "./styles/Login.css";
function Login() {
  const navigate = useNavigate();
  function signup() {
    navigate("/signup");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function HandleSubmit(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page

    fetch("http://localhost:3000/api/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Correct header name
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          navigate("/dashboard", { state: { email: email } });
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="login-page">
      {/* <h1 className="signin">Bcrypt hash Generator</h1> */}
      {/* <h1 className="signin">Sign In</h1> */}
      <Header showAuthButtons={false} />
      <div className="login-form">
        <h1>Enter the Email</h1>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1>Enter the Password</h1>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={HandleSubmit} className="submit-button">
          Submit
        </button>
        <div className="create-new-account">
          Create New Account ?&nbsp;
          <a onClick={signup}>Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
