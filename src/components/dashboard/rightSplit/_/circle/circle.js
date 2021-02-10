import React, { useRef, useEffect } from "react";
import colors from "../../_/colors";

const drawPie = (ctx, start, end, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(200, 200);
  const startAngle = (start / 100) * 2 * Math.PI + 1.5 * Math.PI;
  const endAngle = (end / 100) * 2 * Math.PI + 1.5 * Math.PI;
  ctx.arc(200, 200, 192, startAngle, endAngle);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
};

const drawHollow = (ctx, rayon, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(200, 200);
  const startAngle = (0 / 100) * 2 * Math.PI + 1.5 * Math.PI;
  const endAngle = (100 / 100) * 2 * Math.PI + 1.5 * Math.PI;
  ctx.arc(200, 200, rayon, startAngle, endAngle);
  ctx.fill();
};

const drawCorrectionLine = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(200, 110);
  ctx.lineTo(200, 0);
  ctx.stroke();
};

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    props.collaborators.forEach((el, id, arr) => {
      const start = arr
        .filter((el, ID) => ID < id)
        .reduce((acc, el) => el.shares + acc, 0);
      const end = start + el.shares;
      drawPie(context, start, end, colors[id]);
    });
    if (props.collaborators.length !== 0) {
      drawHollow(context, 92, "#FFFFFF");
      drawHollow(context, 48, "#EEE");
      drawCorrectionLine(context);
    }
  }, [props.collaborators]);
  return <canvas ref={canvasRef} width="400" height="400" />;
};

export default Canvas;
