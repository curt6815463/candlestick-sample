import { useEffect, useRef } from "react";
import Candlesticks from "../utils/Candlesticks";

const CandlesticksChart = ({
  zoomRatio,
  data,
  totalYAxisInterval = 4,
  bullColor,
  bearColor,
  width,
  height,
  translateX,
  translateY,
}) => {
  const canvasRef = useRef("");
  const candlesticksRef = useRef("");

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateSettings({
      data,
      zoomRatio,
      totalYAxisInterval,
      bullColor,
      bearColor,
      translateX,
      translateY,
    });
  }, [
    data,
    zoomRatio,
    totalYAxisInterval,
    bullColor,
    bearColor,
    translateX,
    translateY,
  ]);

  useEffect(() => {
    if (!data) return;
    if (candlesticksRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    candlesticksRef.current = new Candlesticks({
      canvas: canvasRef.current,
      zoomRatio,
      data,
      heightPadding: 50,
      totalYAxisInterval,
      bullColor,
      bearColor,
      translateX,
      translateY,
    });
    candlesticksRef.current.draw();
  }, [
    data,
    totalYAxisInterval,
    zoomRatio,
    bullColor,
    bearColor,
    width,
    height,
    translateX,
    translateY,
  ]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CandlesticksChart;
