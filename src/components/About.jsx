import React, { useState } from "react";
import "./styles/About.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  function home() {
    navigate("/");
  }
  return (
    <div>
      <h1 className="about-heading" onClick={home}>
        About
      </h1>
      <div>
        <p className="about-matter">
          <a className="about-name">About</a>
          The Hash Code Converter project, developed by{" "}
          <strong>Sai Venkat</strong>, is a user-friendly application designed
          to securely generate and compare hash codes using the Bcrypt
          algorithm. This innovative tool allows users to input plaintext and
          specify the number of salt rounds to create a unique hash code.
          Additionally, the project features a comparison function that enables
          users to verify if a given plaintext matches an existing hash code,
          ensuring data integrity and security. With a clean interface and
          seamless user experience, the Hash Code Converter aims to simplify the
          process of hash generation and comparison for developers and security
          professionals alike.
        </p>
      </div>
    </div>
  );
}

export default Login;
