import React from "react";
import Button, { ButtonProps } from "./Button";

type PlayButtonProps = {
  isClicked: boolean;
} & Omit<ButtonProps, "label">;

export default function PlayButton({
  isClicked,
  ...buttonProps
}: PlayButtonProps) {
  return <Button label={isClicked ? "Pause" : "Play"} {...buttonProps} />;
}
