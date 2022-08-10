import { useState } from "react";
import CandlesticksChart from "./components/CandlesticksChart";
import useWheelZoom from "./hooks/useWheelZoom";
import data from "./utils/Candlesticks/sampleData";
import styled from "styled-components";

const minRatio = 0.1;
const maxRatio = 1.25;

function App() {
  const [zoomRatio, setZoomRatio] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useWheelZoom({ setZoomRatio });

  const [chartData] = useState(data);
  const handleZoom = (delta) => {
    const ratio = Math.max(Math.min(maxRatio, zoomRatio + delta), minRatio);
    setZoomRatio(ratio);
  };

  const handleTranslateX = (delta) => {
    setTranslateX(Math.max(translateX + delta, 0));
  };

  const handleTranslateY = (delta) => {
    setTranslateY(translateY + delta);
  };

  return (
    <Wrapper className="App">
      <ToolBar>
        <ToolBarTitle>ToolBar</ToolBarTitle>
        <ButtonWrapper>
          <button onClick={() => handleZoom(0.1)}>Zoom In</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleZoom(-0.1)}>Zoom out</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleTranslateX(50)}>Move Left</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleTranslateX(-50)}>Move Right</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleTranslateY(-20)}>Move Top</button>
        </ButtonWrapper>
        <ButtonWrapper>
          <button onClick={() => handleTranslateY(20)}>Move Down</button>
        </ButtonWrapper>
      </ToolBar>
      <CandlesticksChartWrapper>
        <CandlesticksChart
          translateX={translateX}
          translateY={translateY}
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
