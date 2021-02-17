import ReactHtmlParser from 'react-html-parser';
import Copyright from '../../../../../icons/copyright';

const Presentation = (props) => (
  <div className="presentation">
    <div className="presentationB1">
      <div className="logo">
        <Copyright />
      </div>
      <div className="title">{props.title}</div>
    </div>
    <div className="text1">{props.textPresentation}</div>
    <div className="text2">{ReactHtmlParser(props.textDescription)}</div>
  </div>
);

export default Presentation;
