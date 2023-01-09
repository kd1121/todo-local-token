import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInButton.css";

// import uuid from "uuid";

import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function SignInButton() {
  const navigate = useNavigate();

  const [showBuffer, setShowBuffer] = useState(false);

  const handleSignIn = () => {
    setShowBuffer(true);
    setTimeout(() => {
      // Sign in the user here

      const key = uuidv4();
      // Store the key in local storage
      localStorage.setItem("key", key);
      navigate("/home");

      setShowBuffer(false);
    }, 1000);

    // Generate a new key using the uuid library
    // const key = uuidv4();
    // // Store the key in local storage
    // localStorage.setItem("key", key);
    // navigate("/home");
  };

  return (
    <>
      <button className="sin-btn" onClick={handleSignIn}>
        Sign In
      </button>
      {showBuffer && <LoadingSpinner />}
    </>
  );
}

export default SignInButton;
