const PageErrors = (props) => {
  return (
    <div>
      {props.errors.map((el) => (
        <div key={el}>{el}</div>
      ))}
    </div>
  );
};

export default PageErrors;
