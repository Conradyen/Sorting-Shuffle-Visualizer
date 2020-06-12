import React, { useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { ThemeContext } from "./ThemeContext";

export default function ThemeSwitch() {
  const { isDark, toggle } = useContext(ThemeContext);

  return (
    <>
      <Switch
        checked={isDark}
        onChange={() => toggle()}
        color="primary"
        name="modeSwitch"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </>
  );
}
