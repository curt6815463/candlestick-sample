import { useEffect, useRef } from "react";
import Candlesticks from "../utils/Candlesticks";
import data from "../utils/Candlesticks/sampleData";

const CandlestickChart = () => {
  const canvasRef = useRef("");
  const candlesticksRef = useRef("");

  useEffect(() => {
    if (candlesticksRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 350;
    candlesticksRef.current = new Candlesticks({
      canvas: canvasRef.current,
      data,
      heightPadding: 50,
      totalAxisInterval: 4,
      bullColor: "red",
      bearColor: "green",
    });
    candlesticksRef.current.draw();
  }, []);

  useEffect(() => {
    if (!candlesticksRef.current) return;
    candlesticksRef.current.zoom();
  });

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default CandlestickChart;
