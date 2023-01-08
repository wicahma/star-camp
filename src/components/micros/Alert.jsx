import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-dismissible fade show ${props.type}`} role="alert">
      {props.alert}
    </div>
  );
};

export default Alert;
