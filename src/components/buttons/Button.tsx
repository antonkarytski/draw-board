import React from "react";
import classes from "./styles.module.scss";

export type ButtonProps = {
  onClick: () => void;
  label: string;
};

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button className={classes.Button} onClick={onClick}>
      {label}
    </button>
  );
}
