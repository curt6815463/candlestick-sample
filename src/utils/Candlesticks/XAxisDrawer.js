import CanvasUtilDrawer from "./CanvasUtilDrawer";

class XAxisDrawer {
  constructor(options) {
    this.canvas = options.canvas;
    this.ctx = options.ctx;
    this.CanvasUtilDrawer = new CanvasUtilDrawer({
      ctx: options.ctx,
    });
    this.startDrawPosition = options.startDrawPosition;
  }

  getDrawInterval({ text, candleWidth, candleXGap }) {
    this.ctx.font = "bold 10px Arial";
    const textWidth = this.ctx.measureText(text).width + 20;
    const number = Math.ceil(textWidth / (candleWidth + candleXGap)) + 2;
    return number;
  }

  drawGrid({
    candleWidth,
    candleXGap,
    properties,
    interval,
    translateX,
    canvasActualWidth,
  }) {
    properties.forEach((property, index) => {
      if (index % interval === 0) {
        this.ctx.save();
        this.ctx.translate(translateX, 0);

        const startX =
          this.startDrawPosition -
          index * candleWidth -
          index * candleXGap +
          candleWidth / 2;

        if (translateX + startX + 40 > canvasActualWidth) {
          this.ctx.restore();
          return;
        }
        this.CanvasUtilDrawer.drawLine({
          startX: startX,
          endX: startX,
          startY: 0,
          endY: this.canvas.height,
          textAlign: "center",
          color: "#DBDBDB",
        });
        this.CanvasUtilDrawer.drawText({
          text: property?.time,
          x: startX,
          y: this.canvas.height,
          textAlign: "center",
        });
        this.ctx.restore();
      }
    });
  }

  draw(drawInfo) {
    const {
      properties,
      candleWidth,
      candleXGap,
      translateX,
      canvasActualWidth,
    } = drawInfo;
    const interval = this.getDrawInterval({
      text: properties[0].time,
      candleWidth,
      candleXGap,
    });
    this.drawGrid({
      candleWidth,
      candleXGap,
      properties,
      interval,
      translateX,
      canvasActualWidth,
    });
  }
}
export default XAxisDrawer;
