import React from "react";
import Navbar from "./component/Navbar";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import Newz from "./component/Newz"; // Adjust the path as per your project structure

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />

          {/* Define the Home route */}
          <Routes>
            <Route
              path="/sport"
              element={
                <Newz key="sport" pagesize={8} country="in" category="sport" />
              }
            />
            <Route
              path="/"
              element={
                <Newz
                  key="general"
                  pagesize={8}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              element={
                <Newz
                  key="business"
                  pagesize={8}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/health"
              element={
                <Newz
                  key="health"
                  pagesize={8}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <Newz
                  key="science"
                  pagesize={8}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <Newz
                  key="technology"
                  pagesize={8}
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <Newz
                  key="entertainment"
                  pagesize={8}
                  country="in"
                  category="entertainment"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
