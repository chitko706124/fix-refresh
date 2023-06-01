import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "flowbite";
import RouteGuard from "./route/RouteGuard";
import ContactList from "./pages/ContactList";
import Contact from "./pages/Contact";
import CreateContact from "./pages/CreateContact";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import ContactDetail from "./pages/ContactDetail";
import EditContact from "./pages/EditContact";
// import ContactList from './pages/ContactList';
const App = () => {
  const path = useSelector((state) => state.search.path);
  console.log(path);
  // function renderContent() {
  //   if (path === "contactList") {
  //     return <Header />;
  //   }
  // }
  return (
    <>
      {/* {renderContent()} */}
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <ContactList />
            </RouteGuard>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateContact />} />
        <Route path="/detail/:id" element={<ContactDetail />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </>
  );
};

export default App;
