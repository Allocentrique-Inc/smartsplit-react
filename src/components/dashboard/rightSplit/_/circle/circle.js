import React, { useRef, useEffect } from 'react';
import colors from '../colors';

const drawPie = (ctx, start, end, color, consult) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  const zeroY = consult ? 165 : 200;
  ctx.moveTo(200, zeroY);
  const startAngle = (start / 100) * 2 * Math.PI + 1.5 * Math.PI;
  const endAngle = (end / 100) * 2 * Math.PI + 1.5 * Math.PI;
  ctx.arc(200, zeroY, consult ? 164 : 192, startAngle, endAngle);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
};

const drawHollow = (ctx, rayon, color, consult) => {
  ctx.fillStyle = color;
  const zeroY = consult ? 165 : 200;
  ctx.beginPath();
  ctx.moveTo(200, zeroY);
  const startAngle = (0 / 100) * 2 * Math.PI + 1.5 * Math.PI;
  const endAngle = (100 / 100) * 2 * Math.PI + 1.5 * Math.PI;
  ctx.arc(200, zeroY, rayon, startAngle, endAngle);
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
    const context = canvas.getContext('2d');
    props.collaborators.forEach((el, id, arr) => {
      const start = arr
        .filter((el, ID) => ID < id)
        .reduce((acc, el) => el.shares + acc, 0);
      const end = start + el.shares;
      drawPie(context, start, end, colors[id], props.consult);
    });
    if (props.collaborators.length !== 0) {
      drawHollow(context, props.consult ? 72 : 92, '#FFFFFF', props.consult);
      drawHollow(context, props.consult ? 28 : 48, '#EEE', props.consult);
      drawCorrectionLine(context, props.consult);
    }
  }, [props.collaborators]);
  return (
    <canvas ref={canvasRef} width="400" height={props.consult ? 350 : 400} />
  );
};

export default Canvas;
