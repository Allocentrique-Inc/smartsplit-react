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

export function useLyricContributors(copyright) {
  const lyricContributors = copyright
    .filter((rh) => rh.roles.includes('author') || rh.roles.includes('adapter'))
    .map((rh) => ({ rightHolder_id: rh.rightHolder_id }));
  const lyricContributorNb = lyricContributors.length;
  return [lyricContributors, lyricContributorNb];
}

export function useMusicContributors(copyright) {
  const musicContributors = copyright
    .filter((rh) => rh.roles.includes('composer') || rh.roles.includes('mixer'))
    .map((rh) => {
      let weight = 0;
      if (rh.roles.includes('composer')) {
        weight += 1;
      }
      if (rh.roles.includes('mixer')) {
        weight += 1;
      }
      return { rightHolder_id: rh.rightHolder_id, weight };
    });
  const musicContributorNb = musicContributors.reduce(
    (n, current) => n + current.weight,
    0,
  );

  return [musicContributors, musicContributorNb];
}
