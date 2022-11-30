import * as React from "react";
import "../../App.scss";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const [windowDimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimension]);
  useEffect(() => {
    setInterval(() => {
      setDimension({ width: 0, height: 0 });
    }, 4000);
  }, []);
  return (
    <>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1}
        className="z"
      />
    </>
  );
}
