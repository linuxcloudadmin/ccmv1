import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url('/images/image01.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "DarkSlateGrey",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: "3rem", marginBottom: "1rem", marginTop: "0", position: "absolute", top: "20px"  }}>
      Welcome to Credit Card Management Portal
    </h1>
    <p style={{ fontSize: "1.5rem", marginBottom: "2rem", marginTop: "0", position: "absolute", top: "85px" }}>
      Manage your accounts, track expenses, and stay on top of your finances.
    </p>
    <Link
      to="/login"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        textDecoration: "none",
        fontSize: "1.2rem",
        color: "white",
        background: "#007bff",
        padding: "10px 20px",
        borderRadius: "5px",
      }}
    >
      Login
    </Link>
  </div>


);
}

export default WelcomePage;

