import React, { Component } from "react";
import Navbar from "./component/Navbar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Newz from "./component/Newz"; // Adjust the path as per your project structure

class App extends Component {
  pagesize =8 ;
  render() {
    return (
      <>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/sport"
                element={
                  <Newz key="sport" pagesize={this.pagesize} country="in" category="sport" />
                }
              />
              <Route
                path="/"
                element={
                  <Newz key="general" pagesize={this.pagesize} country="in" category="general" />
                }
              />
              <Route
                path="/business"
                element={
                  <Newz key="business" pagesize={this.pagesize} country="in" category="business" />
                }
              />
              <Route
                path="/health"
                element={
                  <Newz key="health" pagesize={this.pagesize} country="in" category="health" />
                }
              />
              <Route
                path="/science"
                element={
                  <Newz key="science" pagesize={this.pagesize} country="in" category="science" />
                }
              />
              <Route
                path="/technology"
                element={
                  <Newz key="technology" pagesize={this.pagesize} country="in" category="technology" />
                }
              />
              <Route
                path="/entertainment"
                element={
                  <Newz key="entertainment" pagesize={this.pagesize} country="in" category="entertainment" />
                }
              />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
