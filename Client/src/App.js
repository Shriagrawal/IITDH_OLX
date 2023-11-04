import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import Navbar from "./Navbar";
import Home from "./pages/Home";
import Research from "./pages/Merchandise";
import Publications from "./pages/Events";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Alumni from "./pages/Alumni";
import { GetItemLocalStorage } from "./Services";
import ShoppingCart from "./shoppingcart/WhishList";
import ChatBox from "./chats/ChatBox";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const[PathName,setPathName]=useState('/home')
  useEffect( () => {
    setPathName(window.location.pathname)
  },[]);

  useEffect(() => {
    // const userData = GetItemLocalStorage('user');
    // if (userData) {
    //   setIsAuthenticated(true);
    // } else {
    //   setIsAuthenticated(false);
    // }
  }, []);



  return (

    <BrowserRouter>
     { PathName!='/signIn' && PathName!='/signUp'&& PathName!='/' && <Navbar />}
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/Merchandise"
          element={isAuthenticated ? <Research /> : <Navigate to="/signIn" replace />}
        />
        <Route
          path="/Events"
          element={isAuthenticated ? <Publications /> : <Navigate to="/signIn" replace />}
        />
        <Route
          path="/Alumni"
          element={isAuthenticated ? <Alumni /> : <Navigate to="/signIn" replace />}
        />
        <Route path="/Profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signIn" replace />} />
        <Route path="/Profile/:id" element={isAuthenticated ? <Profile /> : <Navigate to="/signIn" replace />} />
        <Route path="/Home" element={isAuthenticated ? <Home /> : <Navigate to="/signIn" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
