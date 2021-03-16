import PropTypes from 'prop-types';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import Config from '../../../../config';

const CoverImage = (props) => {
  const { className, coverImage, imgData } = props;

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
      {imgData ? (
        <img src={imgData} alt="cover" />
      ) : coverImage ? (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={coverImage} alt="cover image" />
      ) : (
        <SongPlaceholder size={imageSize} />
      )}
    </div>
  );
};
CoverImage.propTypes = {
  className: PropTypes.string,
  coverImage: PropTypes.oneOfType([PropTypes.string, null]),
  imgData: PropTypes.oneOfType([PropTypes.array, null]),
};
CoverImage.defaultProps = {
  className: 'small',
  coverImage: null,
  imgData: null,
};
export default CoverImage;
