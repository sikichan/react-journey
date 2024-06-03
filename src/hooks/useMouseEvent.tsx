import { useEffect, useState } from "react";

const useMouseEvent = () => {
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setPageX(e.pageX);
    setPageY(e.pageY);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("contextmenu", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("contextmenu", handleMouseDown);
    };
  }, [pageX, pageY]);
  return {
    x: pageX,
    y: pageY,
  };
};
export default useMouseEvent;
