import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import "./styles/GuestDashboard.css";
function GuestDashboard({
  showAuthButtons = true,
  showSaveButton = false,
  showSavedData = false,
  email,
}) {
  // console.log("Guest dashboard email", email);
  const [plaintext, setPlainText] = useState("");
  const [saltrounds, setSaltRounds] = useState();
  const [hashcode, setHashCode] = useState("");
  const [copied, setCopied] = useState(false); // New state for "Copied!" message
  const [plaintextcompare, setPlainTextCompare] = useState("");
  const [hashcodecompare, setHashCodeComapre] = useState("");
  const [comparemessage, setCompareMessage] = useState("");
  const [comparesuccess, setCompareSuccess] = useState(false);
  const [userDate, setUserData] = useState([]);

  const navigate = useNavigate();

  function fetchHashCode() {
    fetch("https://hashify-backend.vercel.app/api/hash-code-convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plaintext: plaintext, saltrounds: saltrounds }),
    })
      .then((response) => response.json())
      .then((data) => {
        const generatedHashCode = data.data;
        setHashCode(generatedHashCode);
        // if (onSave) {
        //   onSave(plaintext, saltrounds, generatedHashCode); // Use generated hash code
        //   console.log("saved the details");
        // }
      })
      .catch((error) => console.log(error));
  }
  function fetchHashCompare() {
    fetch("https://hashify-backend.vercel.app/api/hash-code-compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plaintext: plaintextcompare,
        hashcode: hashcodecompare,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCompareMessage(data.message);
        if (data.success) {
          setCompareSuccess(true);
        } else {
          setCompareSuccess(false);
        }
      })
      .catch((error) => console.log(error));
  }

  const handleSaveData = () => {
    console.log("Saving data:", {
      email,
      plaintext,
      saltrounds,
      hashcode,
    });

    fetch("https://hashify-backend.vercel.app/api/user-hashcode-save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        plaintext,
        saltrounds,
        hashcode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Optionally refresh user data after saving
        alert(data.message);
        fetchUserData();
      })
      .catch((error) => console.log(error.message));
  };

  const fetchUserData = () => {
    fetch("https://hashify-backend.vercel.app/api/user-dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.data);
        } else {
          setUserData([]); // Reset on error
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchUserData();
  }, [email]); // Dependency array to fetch data when email changes

  function reset() {
    setPlainText("");
    setSaltRounds("");
  }

  function copyToClipboard() {
    if (hashcode) {
      navigator.clipboard.writeText(hashcode).then(() => {
        setCopied(true); // Show "Copied!" message
        setTimeout(() => setCopied(false), 2000); // Hide message after 2 seconds
      });
    }
  }
  // onSave(plaintext, saltrounds, hashcode);
  return (
    <div className="guest-page">
      <Header
        showAuthButtons={showAuthButtons}
        showSavedData={showSavedData}
        email={email}
      />
      <div className="form-data">
        <div className="hashcode-generate">
          <h1 className="generate-heading">Hash Code Generate</h1>
          <div className="plaintxt-saltrounds">
            <h1 className="text">Enter The Plain Text</h1>
            <div>
              <input
                className="plaintext-input"
                value={plaintext}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter the plaintext"
              />
            </div>
            <h1 className="text">Enter The SaltRounds</h1>
            <div>
              <input
                className="saltrounds-input"
                value={saltrounds}
                onChange={(e) => setSaltRounds(e.target.value)}
                placeholder="Enter the salt rounds"
              />
            </div>
          </div>
          <div className="generate-reset">
            <button onClick={fetchHashCode} className="generate-button">
              Generate Hash
            </button>
            <button className="reset-button" onClick={reset}>
              Reset
            </button>
            {showSaveButton && (
              <button onClick={handleSaveData} className="save-button">
                Save
              </button>
            )}
          </div>
          <div className="hashcode-container">
            {hashcode && (
              <div className="hashcode-content">
                <h1>Hash Code:&nbsp;</h1>
                <div className="hash-text">
                  <span className={`hash-code ${copied ? "highlight" : ""}`}>
                    {hashcode}
                  </span>
                </div>
                <button onClick={copyToClipboard} className="copy-button">
                  Copy
                </button>
              </div>
            )}
            {copied && <span className="copied-message">Copied!</span>}
          </div>
        </div>
        <div className="hashcompare">
          <h1 className="hashcode-compare">Hash code Compare</h1>
          <p className="text">Enter the plain text to compare</p>
          <input
            className="compare-plaintxt"
            placeholder="Enter the plain text to compare"
            value={plaintextcompare}
            type="string"
            onChange={(e) => setPlainTextCompare(e.target.value)}
          ></input>
          <p className="text">Enter the hash code text to compare</p>
          <input
            className="compare-hashcode"
            placeholder="Enter the hashCode to compare"
            type="String"
            value={hashcodecompare}
            onChange={(e) => setHashCodeComapre(e.target.value)}
          ></input>
          <h2
            className={comparesuccess ? "compare-success" : "compare-failure"}
          >
            {comparemessage}
          </h2>
          <button onClick={fetchHashCompare} className="compare-button">
            Compare
          </button>
        </div>
      </div>
      <footer>
        <h1>This is my First Project</h1>
        <h3>&copy; Sai Venkat</h3>
      </footer>
    </div>
  );
}

export default GuestDashboard;
