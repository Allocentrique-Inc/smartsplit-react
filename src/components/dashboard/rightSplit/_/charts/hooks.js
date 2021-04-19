import {
  degreesToRadians,
  genSliceData,
  getShareTotal,
  rotatePoint,
} from './utils';
import PieChartSlice from './pieChartSlice/pieChartSlice';

export function usePieChartSlices({
  data,
  angleRange = 360,
  clockwise,
  size,
  startAngle,
  pdfMode = false,
}) {
  const shareAngle =
    (clockwise ? 1 : -1) * degreesToRadians(angleRange / getShareTotal(data));
  const center = {
    x: size / 2,
    y: size / 2,
  };
  const radius = size / 2;

  let start = {
    x: center.x,
    y: center.y - radius,
  };
  if (startAngle) {
    start = rotatePoint(start, center, degreesToRadians(startAngle));
  }
  return data.map((dataPoint) => {
    const end = rotatePoint(start, center, dataPoint.shares * shareAngle);
    const slice = pdfMode ? (
      genSliceData({
        start,
        end,
        center,
        radius,
        angle: dataPoint.shares * shareAngle,
        color: dataPoint.color,
        clockwise,
        key: dataPoint.key,
      })
    ) : (
      <PieChartSlice
        start={start}
        end={end}
        center={center}
        radius={radius}
        angle={dataPoint.shares * shareAngle}
        color={dataPoint.color}
        clockwise={clockwise}
        key={dataPoint.key}
      />
    );
    start = end;
    return slice;
  });
}
