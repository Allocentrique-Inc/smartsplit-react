const Presentation = (props) => (
  <div className="presentation">
    <div className="presentationB1">
      <div className="logo" />
      <div className="title">{props.title}</div>
    </div>
    <div className="text1">{props.textPresentation}</div>
    <div className="text2">{props.textDescription}</div>
  </div>
);

export default Presentation;
