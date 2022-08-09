import { useEffect } from "react";

const minRatio = 0.1;
const maxRatio = 1.25;

const useWheelZoom = ({ setZoomRatio }) => {
  useEffect(() => {
    const listener = window.addEventListener("wheel", (event) => {
      setZoomRatio((zoomRatio) => {
        const delta = event.deltaY > 0 ? -0.01 : 0.01;
        const ratio = zoomRatio + delta;
        return Math.min(Math.max(ratio, minRatio), maxRatio);
      });
    });
    return window.removeEventListener("wheel", listener);
  }, [setZoomRatio]);
};

export default useWheelZoom;
