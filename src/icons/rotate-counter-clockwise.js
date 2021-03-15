const RotateCounterClockwise = (props) => {
  const { color } = props;
  const fill = color || '#2DA84F';
  return (
    <svg
      width="24"
      height="24"
      fill={fill}
      className="bi bi-arrow-counterclockwise"
      viewBox="0 0 24 24"
    >
      <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
    </svg>
  );
};
export default RotateCounterClockwise;
