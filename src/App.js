import React from 'react';
import Navbar from './component/Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Newz from './component/Newz'; // Adjust the path as per your project structure

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar />
          <Newz key="sport" pagesize={8} country="in" category="sport" />
          {/* <Switch>
            <Route exact path="/sport">
              <Newz key="sport" pagesize={5} country="in" category="sport" />
            </Route>
            <Route exact path="/general">
              <Newz key="general" pagesize={5} country="in" category="general" />
            </Route>
            <Route exact path="/business">
              <Newz key="business" pagesize={5} country="in" category="business" />
            </Route>
            <Route exact path="/health">
              <Newz key="health" pagesize={5} country="in" category="health" />
            </Route>
            <Route exact path="/science">
              <Newz key="science" pagesize={5} country="in" category="science" />
            </Route>
            <Route exact path="/technology">
              <Newz key="technology" pagesize={5} country="in" category="technology" />
            </Route>
            <Route exact path="/entertainment">
              <Newz key="entertainment" pagesize={5} country="in" category="entertainment" />
            </Route>
          </Switch> */}


        </Router>
      </div>
    </>
  );
}

export default App;
