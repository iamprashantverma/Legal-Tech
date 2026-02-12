import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <p className="loading__text">{text}</p>
    </div>
  );
};

export default Loading;
