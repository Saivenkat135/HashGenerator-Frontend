import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header.jsx";
import "./styles/SavedUserData.css";
function SavedUserData() {
  const { email } = useParams();
  let DecodedEmail;
  try {
    DecodedEmail = atob(email); // Decode the Base64 string
  } catch (error) {
    console.error("Failed to decode email:", error);
    DecodedEmail = "Invalid Email"; // Fallback value if decoding fails
  }
  // console.log("decodedEmail is saved URL", DecodedEmail);
  const [userData, setUserData] = useState([]);
  function fetchSavedData() {
    fetch("https://hashify-backend.vercel.app/api/user-dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: DecodedEmail }),
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
  }
  useEffect(() => {
    fetchSavedData();
  }, [email]);
  return (
    <div>
      <Header showAuthButtons={false} />
      <div className="savedDataItems">
        {userData.length > 0 ? (
          <ol className="ordered-list">
            {userData.map((user, index) => (
              <li key={index} className="list">
                <strong>Plaintext:</strong> {user.plaintext}
                <br />
                <strong>Salt Rounds:</strong> {user.saltrounds}
                <br />
                <strong>Hash Code:</strong> {user.hashcode}
              </li>
            ))}
          </ol>
        ) : (
          <p className="noDataAvailable">No data available</p> // Show a message when there's no data
        )}
      </div>
    </div>
  );
}
export default SavedUserData;
