import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
// import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Notes from "./Pages/Notes/Notes";
import Error from "./Pages/Error/Error";
import NavBr from "./Components/NavBr/NavBr";
import Footer from "./Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { current } from "./JS/Actions/user";
import CreateNote from "./Pages/CreateNote/CreateNote";
import UpdateNote from "./Pages/UpdateNote/UpdateNote";
function App() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.userReducer.user);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(current());
  //   }
  // }, [dispatch]);
  // console.log(search);
  return (
    <div className="App">
      <NavBr setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<CreateNote />} />
          <Route
            path="/notes"
            element={<Notes search={search} user={user} />}
          />
          <Route path="/notes/:id" element={<UpdateNote />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
