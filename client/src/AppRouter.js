import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import { AuthProvider } from "./context/authcontext";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={UserProfile} />
      </Router>
    </AuthProvider>
  );
};
