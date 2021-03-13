import PropTypes from 'prop-types';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import Config from '../../../../config';

const CoverImage = (props) => {
  const { workpiece, className, imgData } = props;
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
      {imgData
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        ? <img src={imgData} alt="cover image" /> :
        (workpiece
          && workpiece.documentation
          && workpiece.documentation.files
          && workpiece.files.documentation.art
          && workpiece.files.documentation.art.length
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          ? <img src={workpiece.documentation.files.art[0].url} alt="cover image" />
          : <SongPlaceholder size={imageSize} />)
      }

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
