import React from "react";

type ButtonProps = {
  onClick: () => void;
  isClicked: boolean;
};

export default function PlayButton({ onClick, isClicked }: ButtonProps) {
  return <button onClick={onClick}>{isClicked ? "Pause" : "Play"}</button>;
}
