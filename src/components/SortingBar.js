import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function SortingBar(props) {
  // const barstyle = { width: `${props.width}px`, height: `${props.height}px` };

  return (
    <div
      id="sortBar"
      className="Sort_Bar"
      style={{
        position: "absolute",
        display: "flex",
        bottom: "0",
        width: `${props.width}px`,
        height: `${props.height}px`,
        left: `${props.index * (props.width + 2)}px`,
        backgroundColor: `${props.color}`
      }}
    ></div>
  );
}
