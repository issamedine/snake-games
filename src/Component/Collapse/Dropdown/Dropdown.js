import React, { useState } from "react";

const Dropdown = ({ children, title }) => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  
  const handleShow = () => {
    if (show) {
      setHide(true);
      setShow(false);
    }
    if (!show) {
      setHide(false);
      setShow(true);
    }
  };

  return (
    <div className="dropdown">
      <div className="title" onClick={handleShow}>
        {title}
      </div>
      <div
        className={`${show && "child-show"} ${
          hide && "child-hidden"
        } default-child`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;