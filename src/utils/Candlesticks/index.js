import YAxisDrawer from "./YAxisDrawer";
import XAxisDrawer from "./XAxisDrawer";
import ContentDrawer from "./ContentDrawer";

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
    this.zoomRatio = options.zoomRatio || 1;
    this.candleDefaultWidth = 16;
    this.candleDefaultXGap = 7;
    this.scaleRatio = options.scaleRatio || 1;

    this.translateX = options.translateX || 0;
    this.translateY = options.translateY || 0;
    this.totalYAxisInterval = options.totalYAxisInterval;
    this.startDrawPosition = this.canvas.width * 0.8;
    this.YAxisDrawer = new YAxisDrawer({
      canvas: this.canvas,
      ctx: this.ctx,
    });
    this.XAxisDrawer = new XAxisDrawer({
      canvas: this.canvas,
      ctx: this.ctx,
    });
    this.ContentDrawer = new ContentDrawer({
      canvas: this.canvas,
      ctx: this.ctx,
      bullColor: options.bullColor,
      bearColor: options.bearColor,
    });
  }

  updateSettings({
    data,
    zoomRatio,
    totalYAxisInterval,
    bullColor,
    bearColor,
    translateX,
    translateY,
    scaleRatio,
  }) {
    this.timeSeries = data;
    this.properties = Object.entries(this.timeSeries).map(
      ([time, property]) => {
        return {
          time,
          ...property,
        };
      }
    );
    this.zoomRatio = Math.max(zoomRatio, 0.1);
    this.totalYAxisInterval = totalYAxisInterval;
    this.bullColor = bullColor;
    this.bearColor = bearColor;
    this.translateX = translateX;
    this.translateY = translateY;
    this.scaleRatio = scaleRatio;
    this.draw();
  }

  updateData(data) {
    this.timeSeries = data;
    this.properties = Object.entries(this.timeSeries).map(
      ([time, property]) => {
        return {
          time,
          ...property,
        };
      }
    );
    this.draw();
  }

  updateZoomRatio(zoomRatio) {
    this.zoomRatio = Math.max(zoomRatio, 0.1);
    this.draw();
  }

  updateTotalYAxisInterval(interval) {
    this.totalYAxisInterval = interval;
    this.draw();
  }

  updateCandleColor({ bullColor, bearColor }) {
    this.bullColor = bullColor;
    this.bearColor = bearColor;
    this.draw();
  }

  updateTranslateX(translateX) {
    this.translateX = translateX;
    this.draw();
  }

  updateTranslateY(translateY) {
    this.translateY = translateY;
    this.draw();
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

  draw() {
    const canvasActualHeight = this.canvas.height - this.heightPadding * 2;
    const canvasActualWidth = this.canvas.width;
    const translateX = this.translateX;
    const translateY = this.translateY;
    const heightPadding = this.heightPadding;
    const startDrawPosition = this.startDrawPosition;

    const candleWidth = this.candleDefaultWidth * this.zoomRatio;
    const candleXGap = this.candleDefaultXGap * this.zoomRatio;
    const totalYAxisInterval = this.totalYAxisInterval;
    const properties = this.properties;
    const inChartProperties = this.getInChartProperties({
      candleWidth,
      candleXGap,
    });
    const allPrices = this.arrayOfAllPrices(inChartProperties);
    const max = Math.max(...allPrices);
    const min = Math.min(...allPrices);

    const scale = (max - min) / (totalYAxisInterval - 1);
    const gridMax = max + scale / 2;
    const gridMin = gridMax - scale * totalYAxisInterval;

    const gridScaleDelta = (gridMax - gridMin) * (1 - this.scaleRatio);
    const drawInfo = {
      scale: scale * this.scaleRatio,
      gridMax: gridMax - gridScaleDelta / 2,
      gridMin: gridMin + gridScaleDelta / 2,
      totalYAxisInterval,
      canvasActualHeight,
      canvasActualWidth,
      properties,
      candleWidth,
      candleXGap,
      translateX,
      translateY,
      heightPadding,
      startDrawPosition,
    };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.YAxisDrawer.draw(drawInfo);
    this.XAxisDrawer.draw(drawInfo);
    this.ContentDrawer.draw(drawInfo);
  }
}
export default Candlesticks;
