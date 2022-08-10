import { useEffect, useRef } from "react";
import Candlesticks from "../utils/Candlesticks";

const CandlesticksChart = ({
  zoomRatio,
  data,
  totalAxisInterval = 4,
  bullColor,
  bearColor,
  width,
  height,
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
    candlesticksRef.current.updateTotalAxisInterval(totalAxisInterval);
  }, [totalAxisInterval]);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.updateCandleColor({ bullColor, bearColor });
  }, [bullColor, bearColor]);

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
      totalAxisInterval,
      bullColor,
      bearColor,
    });
    candlesticksRef.current.draw();
  }, [data, totalAxisInterval, zoomRatio, bullColor, bearColor, width, height]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CandlesticksChart;
