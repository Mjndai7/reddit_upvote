import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/admin";
import LoginPage from "./components/authentication/Login";
import RegisterPage from "./components/authentication/Register";
import ForgotCard from "./components/authentication/forgotPassword";
import ResetCard from "./components/authentication/resetPassword";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router>
      <Routes>
        {isAdmin ? (
          <Route element={<PrivateRoutes setIsAdmin={setIsAdmin}/>}>
            <Route path="/upvote" element={<Admin />} />
            <Route path="/comment" element={<Admin />} />
             <Route path="/users" element={<Admin />} />
             <Route path="/accounts" element={<Admin />} />
            <Route path="/profile" element={<Admin />} />
            <Route path="/add-user" element={<Admin />} />
            <Route path="/" element={<Admin />} />
            <Route path="*" element={<Admin />} />
          </Route>
        ) : 
        (
          <Route element={<PrivateRoutes  setIsAdmin={setIsAdmin}/>}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/upvote" element={<Home />} />
            <Route path="/comment" element={<Home />} />
            <Route path="/profile" element={<Home />} />
          </Route>
        )
        }
        <Route element={<LoginPage setIsAdmin={setIsAdmin} />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ForgotCard />} path="/forgot-password" />
        <Route element={<ResetCard />} path="/reset-password" />
      </Routes>
    </Router>
  );
};

export default App;
;
