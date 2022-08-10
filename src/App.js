import { useState } from "react";
import CandlesticksChart from "./components/CandlesticksChart";
import useWheelZoom from "./hooks/useWheelZoom";
import data from "./utils/Candlesticks/sampleData";
import styled from "styled-components";

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
    <Wrapper className="App">
      <ToolBar>
        <ToolBarTitle>ToolBar</ToolBarTitle>
        <ButtonWrapper>
          <button onClick={() => handleZoom(0.1)}>zoomIn</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleZoom(-0.1)}>zoomOut</button>
        </ButtonWrapper>
        <span>wheel is available</span>
      </ToolBar>
      <CandlesticksChartWrapper>
        <CandlesticksChart
          bullColor={"orange"}
          bearColor={"blue"}
          data={chartData}
          zoomRatio={zoomRatio}
          totalYAxisInterval={10}
          width={"700"}
          height={"350"}
        ></CandlesticksChart>
      </CandlesticksChartWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
const ToolBar = styled.div`
  margin-right: 12px;
  text-align: center;
`;

const ToolBarTitle = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
  }
`;

const CandlesticksChartWrapper = styled.div`
  flex: 1;
  canvas {
    border: 1px solid #dbdbdb;
  }
`;

export default App;
