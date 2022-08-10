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
2. YAxisDrawer.js
3. ContentDrawer.js
4. CanvasUtilDrawer.js
5. XAxisDrawer.js

### index

Entry point of this Util. Responsible for managing the settings of chart. And calc the draw information for `YAxisDrawer` and `ContentDrawer` class

### ContentDrawer

Draw the candle and wick.

### YAxisDrawer

Draw the data of price on the Y-axis.

### XAxisDrawer

Draw the data of time on the X-axis.

### CanvasUtilDrawer

Wrap Canvas api into some common function such as `drawLine`.

## Interaction component - CandlesticksChart

CandlesticksChart component will responsible for interacting between React and Chart Util.
