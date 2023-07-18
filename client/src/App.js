import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Notes from "./Pages/Notes/Notes";
import Error from "./Pages/Error/Error";
import NavBr from "./Components/NavBr/NavBr";
import Footer from "./Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { current } from "./JS/Actions/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(current());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <NavBr />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
