import { useState } from "react";
import CandlesticksChart from "./components/CandlesticksChart";
import useWheelZoom from "./hooks/useWheelZoom";

const minRatio = 0.1;
const maxRatio = 1.25;

function App() {
  const [zoomRatio, setZoomRatio] = useState(1);
  useWheelZoom({ setZoomRatio });

  const handleZoom = (delta) => {
    const ratio = Math.max(Math.min(maxRatio, zoomRatio + delta), minRatio);
    setZoomRatio(ratio);
  };
  return (
    <div className="App">
      <CandlesticksChart zoomRatio={zoomRatio}></CandlesticksChart>
      <button onClick={() => handleZoom(0.1)}>zoomIn</button>
      <button onClick={() => handleZoom(-0.1)}>zoomOut</button>
    </div>
  );
}

export default App;
