import React from "react";
import SortingBar from "../components/SortingBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  visbar: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "0",
    margin: "10px"
  }
});

export default function Visualizer(props) {
  const classes = useStyles();

  return (
    <div className={classes.visbar}>
      {props.arr.map((number, index) => (
        <SortingBar
          height={number}
          width={600 / props.numBar}
          index={index}
          color="#000000"
          key={index}
        />
      ))}
    </div>
  );
}
