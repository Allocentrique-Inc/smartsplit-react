export default function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  disabled,
  color,
  step,
  vertical,
}) {
  return (
    <div className="slider">
      <div className="bar" />
    </div>
  );
}
