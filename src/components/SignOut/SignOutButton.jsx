import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function SignOutButton() {
  const navigate = useNavigate();

  const [showBuffer, setShowBuffer] = useState(false);

  const handleSignOut = () => {
    // Remove the key from local storage
    setShowBuffer(true);
    setTimeout(() => {
      // Sign out the user here

      localStorage.removeItem("key");
      navigate("/");

      setShowBuffer(false);
    }, 1000);

    // localStorage.removeItem("key");
    // navigate("/");
  };

  return (
    <>
      <button onClick={handleSignOut}>Sign Out</button>
      {showBuffer && <LoadingSpinner />}
    </>
  );
}

export default SignOutButton;
