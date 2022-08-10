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
}) => {
  const canvasRef = useRef("");
  const candlesticksRef = useRef("");

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateData(data);
  }, [data]);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateZoomRatio(zoomRatio);
  }, [zoomRatio]);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateTotalYAxisInterval(totalYAxisInterval);
  }, [totalYAxisInterval]);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateCandleColor({ bullColor, bearColor });
  }, [bullColor, bearColor]);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateTranslateX(translateX);
  }, [translateX]);

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
  ]);

  return <canvas ref={canvasRef}></canvas>;
};

export default CandlesticksChart;
