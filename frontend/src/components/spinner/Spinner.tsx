import React from "react";
import classes from "./Spinner.module.css"; // Import style as an object

type Props = {
  size?: string; // Optional prop
  borderWidth?: string; // Optional prop
  color?: string; // Optional prop
};

const Spinner: React.FC<Props> = ({ size = "40px", borderWidth = "4px", color = "white" }) => {
  return (
    <div
      className={classes.spinner} // Apply the class from the CSS module
      style={{
        width: size,
        height: size,
        borderWidth: borderWidth,
        borderTopColor: color, // Color from prop
      }}
    >
      {/* Loading text can be added for accessibility if desired */}
    </div>
  );
};

export default Spinner;
