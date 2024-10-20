import React, { useState, useEffect } from "react";
import GuestDashboard from "./GuestDashboard";
import { useLocation } from "react-router-dom";
import "./styles/GuestDashboard.css";
import "./styles/dashboard.css";

function Dashboard() {
  const location = useLocation();
  const email = location.state?.email;
  console.log("Email in dashboard", email);

  return (
    <div className="dashboard">
      <div className="dashboard-hash-part">
        <GuestDashboard
          showAuthButtons={false}
          showSaveButton={true}
          showSavedData={true}
          Email={email}
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
