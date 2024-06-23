import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchList from "../pages/SearchList";

const routeConfig = [
  {
    path: "/",
    component: <SearchList />,
  },
];

class RoutesConfig extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {routeConfig.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Routes>
      </Router>
    );
  }
}

export default RoutesConfig;
