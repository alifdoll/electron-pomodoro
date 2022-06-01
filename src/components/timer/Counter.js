import React from "react";

const red = "#FF0000";
const green = "#00FF00";
const purple = "#A020F0";
// 2       1      3
const Counter = ({ session, base, offset }) => {
  return (
    <div
      className="circle"
      style={{
        background: session >= offset ? green : session > base ? purple : red,
      }}
    ></div>
  );
};

export default Counter;
