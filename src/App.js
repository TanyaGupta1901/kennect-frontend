import React, { useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Home from "./components/Home";

const initialState = {
  name: localStorage.getItem("name") || null,
  userId: localStorage.getItem("userId") || null,
};

const userReducer = (state, action) => {
  if (action.type === "login") {
    localStorage.setItem("name", action.payload.name);
    localStorage.setItem("userId", action.payload.userId);
    return {
      name: action.payload.name,
      userId: action.payload.userId,
    };
  } else if (action.type === "logout") {
    localStorage.clear();
    return {
      name: null,
      userId: null,
    };
  }
};
export const UserContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const updateUser = (name, userId) => {
    dispatch({ type: "login", payload: { name, userId } });
  };
  const logoutUser = () => {
    dispatch({ type: "logout" });
  };

  const value = {
    name: state?.name,
    userId: state?.userId,
    updateUser,
    logoutUser,
  };

  return (
    <UserContext.Provider value={value}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Form />}></Route>
            <Route path="/feed" exact element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
