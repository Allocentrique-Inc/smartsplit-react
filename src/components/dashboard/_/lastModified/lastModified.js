import moment from 'moment';
import 'moment/locale/fr';
import * as PropTypes from 'prop-types';

const LastModified = (props) => {
  const { date, className, workpiece, updatedAt, language, children } = props;
  let modifDate;
  if (language) moment.locale(language);

  if (date) modifDate = moment(date);
  else if (updatedAt) modifDate = moment(updatedAt);
  else if (workpiece) modifDate = moment(workpiece.updatedAt);
  else return null;
  return <span className={`last-modified ${className}`}>{children} {modifDate.fromNow()}</span>;
};
LastModified.propTypes = {
  date: PropTypes.string,
  language: PropTypes.string,
  className: PropTypes.string,
};
LastModified.defaultProps = {
  date: '',
  language: 'fr',
  className: '',
};
export default LastModified;
