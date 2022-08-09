import YAxisDrawer from "./YAxisDrawer";
import CandleDrawer from "./CandleDrawer";

class Candlesticks {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.timeSeries = options.data;
    this.properties = Object.entries(this.timeSeries).map(
      ([time, property]) => {
        return {
          time,
          ...property,
        };
      }
    );
    this.heightPadding = options.heightPadding;

    this.candleDefaultWidth = 16;
    this.candleDefaultXGap = 7;

    this.totalAxisInterval = options.totalAxisInterval;

    this.startDrawPosition = this.canvas.width * 0.8;

    this.YAxisDrawer = new YAxisDrawer({
      canvas: this.canvas,
      ctx: this.canvas.getContext("2d"),
      heightPadding: options.heightPadding,
    });
    this.CandleDrawer = new CandleDrawer({
      canvas: this.canvas,
      ctx: this.canvas.getContext("2d"),
      heightPadding: options.heightPadding,
      bullColor: options.bullColor,
      bearColor: options.bearColor,
      startDrawPosition: this.startDrawPosition,
    });
  }

  zoom(zoomRatio) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const ratio = Math.max(zoomRatio, 0.1);
    const candleWidth = this.candleDefaultWidth * ratio;
    const candleXGap = this.candleDefaultXGap * ratio;
    this.draw({ candleWidth, candleXGap });
  }

  arrayOfAllPrices(inChartProperties) {
    return inChartProperties.reduce((result, property) => {
      const { open, high, low, close } = property;
      return [...result, open, high, low, close];
    }, []);
  }

  getInChartProperties({ candleWidth, candleXGap }) {
    const number = Math.round(
      this.startDrawPosition / (candleWidth + candleXGap)
    );
    return this.properties.filter((value, index) => {
      return index <= number;
    });
  }

  draw({ candleWidth, candleXGap } = {}) {
    const inChartProperties = this.getInChartProperties({
      candleWidth: candleWidth || this.candleDefaultWidth,
      candleXGap: candleXGap || this.candleDefaultXGap,
    });
    const allPrices = this.arrayOfAllPrices(inChartProperties);
    const max = Math.max(...allPrices);
    const min = Math.min(...allPrices);

    const scale = (max - min) / (this.totalAxisInterval - 1);
    const gridMax = max + scale / 2;
    const gridMin = gridMax - scale * this.totalAxisInterval;
    const canvasActualHeight = this.canvas.height - this.heightPadding * 2;

    const drawInfo = {
      scale,
      gridMax,
      gridMin,
      totalAxisInterval: this.totalAxisInterval,
      canvasActualHeight,
      properties: this.properties,
      candleWidth: candleWidth || this.candleDefaultWidth,
      candleXGap: candleXGap || this.candleDefaultXGap,
    };
    this.YAxisDrawer.draw(drawInfo);
    this.CandleDrawer.draw(drawInfo);
  }
}
export default Candlesticks;
// const canvas = document.getElementById("stockChart");
// canvas.width = 700;
// canvas.height = 350;

// let myCandlesticks = new Candlesticks({
//   canvas,
//   data,
//   heightPadding: 50,
//   totalAxisInterval: 4,
//   bullColor: "red",
//   bearColor: "green",
// });

// myCandlesticks.draw();

// window.addEventListener("wheel", (event) => {
//   myCandlesticks.zoom(event.deltaY);
// });
