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
    scale,
    heightPadding,
  }) {
    let currentAxisInterval = 0;
    while (currentAxisInterval <= totalYAxisInterval) {
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
      const gridValue = gridMax - currentAxisInterval * scale;
      const text = `${gridValue.toFixed(2)}`;
      this.CanvasUtilDrawer.drawText({
        text,
        x: this.canvas.width - 2,
        y: gridYPosition,
        textAlign: "right",
      });
      currentAxisInterval++;
    }
  }

  draw(drawInfo) {
    const {
      scale,
      gridMax,
      totalYAxisInterval,
      canvasActualHeight,
      heightPadding,
    } = drawInfo;
    this.drawGrid({
      totalYAxisInterval,
      canvasActualHeight,
      gridMax,
      scale,
      heightPadding,
    });
  }
}

export default YAxisDrawer;
