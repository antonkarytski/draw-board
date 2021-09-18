import React, { useState } from "react";

type ButtonProps = {
  onClick: () => void;
};

export default function PlayButton({ onClick }: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      onClick={() => {
        onClick();
        setIsClicked((state) => !state);
      }}
    >
      {isClicked ? "Pause" : "Play"}
    </button>
  );
}
