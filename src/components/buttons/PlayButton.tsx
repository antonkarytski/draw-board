import React from "react";
import Button, { ButtonProps } from "./Button";

type PlayButtonProps = {
  isClicked: boolean;
} & Omit<ButtonProps, "label">;

export default function PlayButton({ onClick, isClicked }: PlayButtonProps) {
  return <Button onClick={onClick} label={isClicked ? "Pause" : "Play"} />;
}
