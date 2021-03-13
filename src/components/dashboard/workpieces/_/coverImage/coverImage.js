import PropTypes from 'prop-types';
import SongPlaceholder from '../../../../../icons/songPlaceholder';
import Config from '../../../../../config';

const CoverImage = (props) => {
  const { workpiece, className } = props;
  const sizes = {
    large: 128,
    medium: 72,
    small: 40,
    tiny: 24,
  };
  let imageSize = 40;
  if (sizes[className]) imageSize = sizes[className];
  return (
    <div className={`cover-image ${className}`}>
      <SongPlaceholder size={imageSize} />
    </div>
  );
};
CoverImage.propTypes = {
  className: PropTypes.string,
};
CoverImage.defaultProps = {
  className: 'small',
};
export default CoverImage;
