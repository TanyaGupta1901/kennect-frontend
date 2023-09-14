import React, { useRef, useContext, useState } from "react";
import { fetchUser } from "../services";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Form() {
  const { updateUser } = useContext(UserContext);
  const username = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUser = async () => {
    setLoading(true);
    const { data, status } = await fetchUser(username.current.value);
    if (status === 200) {
      updateUser(data.name, data.userId);
      setLoading(false);
      navigate("/feed");
    } else {
      alert("Try again");
      setLoading(false);
      navigate("/")
    }
  };

  return (
    <div className="entryForm">
      {!loading ? (
        <div className="formContainer">
          <label>Welcome! Please Enter Username</label>
          <div className="actionForm">
            <input className="searchInput" ref={username}></input>
            <button className="purpleButton" onClick={handleUser}>
              Enter
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">Loading...</div>
      )}
    </div>
  );
}

export default Form;
