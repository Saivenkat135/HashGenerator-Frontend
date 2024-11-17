import React, { useState, useEffect } from "react";
import GuestDashboard from "./GuestDashboard";
import { useLocation, useParams } from "react-router-dom";
import "./styles/GuestDashboard.css";
import "./styles/dashboard.css";

function Dashboard() {
  const { email } = useParams();
  let decodedEmail;
  try {
    decodedEmail = atob(email); // Decode the Base64 string
  } catch (error) {
    console.error("Failed to decode email:", error);
    decodedEmail = "Invalid Email"; // Fallback value if decoding fails
  }
  return (
    <div className="dashboard">
      <div className="dashboard-hash-part">
        <GuestDashboard
          showAuthButtons={false}
          showSaveButton={true}
          showSavedData={true}
          email={decodedEmail}
        />
        {/* Only show the Save button here
        <button onClick={handleSaveData} className="save-button">
          Save
        </button> */}
      </div>
    </div>
  );
}

export default Dashboard;
