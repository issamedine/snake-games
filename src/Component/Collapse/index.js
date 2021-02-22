import React from "react";

import "./collapse.css";
import Dropdown from "./Dropdown/Dropdown";

const Collapse = () => {
  return (
    <div className="item-1">
      <Dropdown title="item-1">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
             Proin condimentum sollicitudin eros, non sagittis sapien consequat vel</p>
      </Dropdown>
    </div>
  );
};

export default Collapse;