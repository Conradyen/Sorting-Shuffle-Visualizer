import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bar: {
    position: "absolute",
    display: "flex",
    bottom: "0",
    left: 0,
    color: "#ffffff",
    textAlign: "center"
  }
});

export default function SortingBar(props) {
  const classes = useStyles();
  // const barstyle = { width: `${props.width}px`, height: `${props.height}px` };

  return (
    <div
      id="sortBar"
      className={classes.bar}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        left: `${props.index * (props.width + 2)}px`,
        backgroundColor: `${props.color}`
      }}
    ></div>
  );
}
