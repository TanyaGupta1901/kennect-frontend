import React, { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { name, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <h3>Welcome, {name}</h3>
      <button
        className="purpleButton"
        onClick={() => {
          navigate("/");
          logoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
