import ReactHtmlParser from 'react-html-parser';
import Copyright from '../../../../../icons/copyright';
import Recording from '../../../../../icons/recording';
import Performance from '../../../../../icons/performance';
import Privacy from '../../../../../icons/privacy';

const Presentation = (props) => {
  const logoSize = props.isMobile ? 16 : 24;

  return (
    <div className="presentation">
      <div className="presentationB1">
        <div className="logo">
          {(() => {
            switch (props.view) {
              case 'copyright':
                return <Copyright size={logoSize} />;
              case 'performance':
                return <Performance size={logoSize} />;
              case 'recording':
                return <Recording size={logoSize} />;
              case 'privacy':
                return <Privacy size={logoSize} />;
              default:
                return null;
            }
          })()}
        </div>
        <div className="title">{props.t_title}</div>
      </div>
      <div className="text1">{props.t_presentation}</div>
      <div className="text2">{ReactHtmlParser(props.t_description)}</div>
    </div>
  );
};

export default Presentation;
