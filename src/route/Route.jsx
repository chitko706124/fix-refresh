import React from "react";
import { Route, Routes } from "react-router-dom";
// import ContactList from "../pages/ContactList";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
import RouteGuard from "./RouteGuard";
import Dashboard from "../pages/Dashboard";
// import CreateContent from "../pages/CreateContent";

const RoutePath = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteGuard>
            <Dashboard />
          </RouteGuard>
        }
      />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/create" element={<CreateContent />} /> */}
    </Routes>
  );
};

export default RoutePath;
