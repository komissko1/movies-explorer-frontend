import React from "react";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <ul className="navBar">
      {props.children}
    </ul>
  );
}

export default Navigation;
