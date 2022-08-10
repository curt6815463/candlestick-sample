import CanvasUtilDrawer from "./CanvasUtilDrawer";
class ContentDrawer {
  constructor(options) {
    this.bullColor = options.bullColor;
    this.bearColor = options.bearColor;
    this.startDrawPosition = options.startDrawPosition;
    this.heightPadding = options.heightPadding;
    this.ctx = options.ctx;
    this.CanvasUtilDrawer = new CanvasUtilDrawer({
      ctx: options.ctx,
    });
  }

  getCandleColor({ openPrice, closePrice }) {
    if (openPrice > closePrice) {
      return this.bearColor;
    } else if (openPrice < closePrice) {
      return this.bullColor;
    } else {
      return "#000";
    }
  }

  drawContent({
    properties,
    canvasActualHeight,
    canvasActualWidth,
    gridMax,
    gridMin,
    candleWidth,
    candleXGap,
    translateX,
  }) {
    const girdTotalDiff = gridMax - gridMin;
    properties.forEach((property, index) => {
      this.ctx.save();
      this.ctx.translate(translateX, 0);
      const { open, close, high, low } = property;
      const openPrice = Number.parseFloat(open);
      const closePrice = Number.parseFloat(close);
      const highPrice = Number.parseFloat(high);
      const lowPrice = Number.parseFloat(low);

      const candleColor = this.getCandleColor({ openPrice, closePrice });
      const rectUpperValue = openPrice > closePrice ? openPrice : closePrice;
      const rectLeftTopX =
        this.startDrawPosition - index * candleWidth - candleXGap * index;
      const rectLeftTopY =
        canvasActualHeight * ((gridMax - rectUpperValue) / girdTotalDiff) +
        this.heightPadding;
      const isOpenCloseEqual = openPrice === closePrice;
      const openCloseDiff = Math.abs(openPrice - closePrice);
      const rectHeight = isOpenCloseEqual
        ? 1
        : canvasActualHeight * (openCloseDiff / girdTotalDiff);

      if (translateX + rectLeftTopX + candleWidth + 40 > canvasActualWidth) {
        this.ctx.restore();
        return;
      }
      this.CanvasUtilDrawer.drawRect({
        leftTopX: rectLeftTopX,
        leftTopY: rectLeftTopY,
        width: candleWidth,
        height: rectHeight,
        color: candleColor,
      });

      const wickStartX = rectLeftTopX + candleWidth / 2;
      const wickEndX = rectLeftTopX + candleWidth / 2;

      const wickStartY =
        canvasActualHeight * ((gridMax - highPrice) / girdTotalDiff) +
        this.heightPadding;
      const wickEndY =
        canvasActualHeight * ((gridMax - lowPrice) / girdTotalDiff) +
        this.heightPadding;

      this.CanvasUtilDrawer.drawLine({
        startX: wickStartX,
        endX: wickEndX,
        startY: wickStartY,
        endY: wickEndY,
        color: candleColor,
      });
      this.ctx.restore();
    });
  }

  draw(drawInfo) {
    const {
      canvasActualHeight,
      canvasActualWidth,
      gridMax,
      gridMin,
      properties,
      candleWidth,
      candleXGap,
      translateX,
    } = drawInfo;
    this.drawContent({
      canvasActualHeight,
      canvasActualWidth,
      gridMax,
      gridMin,
      properties,
      candleWidth,
      candleXGap,
      translateX,
    });
  }
}

export default ContentDrawer;
