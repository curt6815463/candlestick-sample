import CanvasUtilDrawer from "./CanvasUtilDrawer";
class YAxisDrawer {
  constructor(options) {
    this.canvas = options.canvas;
    this.CanvasUtilDrawer = new CanvasUtilDrawer({
      ctx: options.ctx,
    });
  }

  drawGrid({
    totalYAxisInterval,
    canvasActualHeight,
    gridMax,
    gridMin,
    scale,
    heightPadding,
    translateY,
  }) {
    const translateRatio = translateY / canvasActualHeight;
    const girdTotalDiff = gridMax - gridMin;
    const adjustValue = girdTotalDiff * translateRatio;

    for (
      let currentAxisInterval = 0;
      currentAxisInterval <= totalYAxisInterval;
      currentAxisInterval++
    ) {
      const gridYPosition =
        canvasActualHeight * (currentAxisInterval / totalYAxisInterval) +
        heightPadding;
      this.CanvasUtilDrawer.drawLine({
        startX: 0,
        startY: gridYPosition,
        endX: this.canvas.width,
        endY: gridYPosition,
        color: "#DBDBDB",
      });
      const gridValue = gridMax - currentAxisInterval * scale + adjustValue;
      const text = `${gridValue.toFixed(2)}`;
      this.CanvasUtilDrawer.drawText({
        text,
        x: this.canvas.width - 2,
        y: gridYPosition,
        textAlign: "right",
      });
    }
  }

  draw(drawInfo) {
    const {
      scale,
      gridMax,
      gridMin,
      totalYAxisInterval,
      canvasActualHeight,
      heightPadding,
      translateY,
    } = drawInfo;
    this.drawGrid({
      totalYAxisInterval,
      canvasActualHeight,
      gridMax,
      gridMin,
      scale,
      heightPadding,
      translateY,
    });
  }
}

export default YAxisDrawer;
