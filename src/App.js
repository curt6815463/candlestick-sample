import { useState } from "react";
import CandlesticksChart from "./components/CandlesticksChart";
import useWheelZoom from "./hooks/useWheelZoom";
import data from "./utils/Candlesticks/sampleData";

const minRatio = 0.1;
const maxRatio = 1.25;

function App() {
  const [zoomRatio, setZoomRatio] = useState(1);
  useWheelZoom({ setZoomRatio });

  const [chartData] = useState(data);
  const handleZoom = (delta) => {
    const ratio = Math.max(Math.min(maxRatio, zoomRatio + delta), minRatio);
    setZoomRatio(ratio);
  };

  return (
    <div className="App">
      <CandlesticksChart
        bullColor={"orange"}
        bearColor={"blue"}
        data={chartData}
        zoomRatio={zoomRatio}
        totalYAxisInterval={10}
        width={"700"}
        height={"350"}
      ></CandlesticksChart>
      <button onClick={() => handleZoom(0.1)}>zoomIn</button>
      <button onClick={() => handleZoom(-0.1)}>zoomOut</button>
    </div>
  );
}

export default App;
