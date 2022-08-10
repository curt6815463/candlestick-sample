## CandleStick

## Intro

It's a demonstration project of using Canvas to draw Candlestick chart and interact with React.

## Basic Usage

```js
import CandlesticksChart from "./components/CandlesticksChart";
import chartData from "./utils/Candlesticks/sampleData";

function App() {
  return (
    <CandlesticksChart
      bullColor={"orange"}
      bearColor={"blue"}
      data={chartData}
      width={"700"}
      height={"350"}
    ></CandlesticksChart>
  );
}
```

## Chart Util - src/utils/Candlesticks

This util use Canvas to draw Candlestick. There are five class under this folder.

1. index.js
2. ContentDrawer.js
3. XAxisDrawer.js
4. YAxisDrawer.js
5. CanvasUtilDrawer.js

### 1. index

Entry point of this Util. Responsible for managing the settings of chart. And calc the draw information for `XAxisDrawer`, `YAxisDrawer`, `ContentDrawer` class

### 2. ContentDrawer

Draw the candle and wick.

### 3. XAxisDrawer

Draw the data of price on the Y-axis.

### 4. YAxisDrawer

Draw the data of time on the X-axis.

### 5. CanvasUtilDrawer

Wrap Canvas api into some common function such as `drawLine`.

## Interaction component - CandlesticksChart

CandlesticksChart component will responsible for interacting between React and Chart Util.
