import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";

function HomeMother() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌸 Welcome to Bloom, Mother!</h1>
      <p>This is your dashboard.</p>

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </button>
    </div>
  );
}

export default HomeMother;
