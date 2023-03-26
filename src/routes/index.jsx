import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import Inbox from "./../pages/Inbox";
import MessagesBox from "./../components/inbox/MessagesBox";
import PublicRoutes from "./public";
import PrivateRoutes from "./private";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />

        <Route
          path="/inbox"
          element={
            <PrivateRoutes>
              <Inbox />
            </PrivateRoutes>
          }>
          <Route path="/inbox/:id" element={<MessagesBox />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
