import React from "react";

function Navigation(props) {
  return (
    <ul className="navBar">
      {props.children}
    </ul>
  );
}

export default Navigation;
