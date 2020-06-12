import React, { useState, useEffect } from "react";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
interface IComponentProps {
  children: any;
  delay: number;
  show: boolean;
}

const useStyles = makeStyles({
  fade: {
    justifyContent: "center",
    alignItems: "center",
  },
});
const ActionAlert: React.FC<IComponentProps> = ({ children, delay, show }) => {
  let timer: any | null = null;
  // First, set the internal `visible` state to negate
  // the provided `show` prop
  const [visible, setVisible] = useState(!show);
  const classes = useStyles();
  // Call `setTimer` every time `show` changes, which is
  // controlled by the parent.
  useEffect(() => {
    setTimer();
  }, [show]);

  function setTimer() {
    // clear any existing timer
    if (timer != null) {
      clearTimeout(timer);
    }

    // hide after `delay` milliseconds
    timer = setTimeout(() => {
      setVisible(!visible);
      timer = null;
    }, delay);
  }
  return visible ? (
    <Fade
      in={show}
      timeout={{
        enter: delay,
        exit: delay,
      }}
    >
      <div className={classes.fade}>{children}</div>
    </Fade>
  ) : (
    <span />
  );
};

export default ActionAlert;
