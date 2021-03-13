import PropTypes from 'prop-types';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import Config from '../../../../config';

const CoverImage = (props) => {
  console.log(props);
  const { workpiece, className, imgData, artFiles } = props;
  console.log(artFiles);
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
          && workpiece.documentation.files.art
          && workpiece.documentation.files.art.length
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          ? <img data-version={artFiles ? artFiles.length : workpiece.documentation.files.art.length} src={Config.apiUrl + workpiece.documentation.files.art[workpiece.documentation.files.art.length - 1].url} alt="cover image" />
          : <SongPlaceholder size={imageSize} />)
      }

    </div>
  );
};
CoverImage.propTypes = {
  className: PropTypes.string,
  imgData: PropTypes.oneOfType([PropTypes.array, null]),
};
CoverImage.defaultProps = {
  className: 'small',
  imgData: null,
};
export default CoverImage;
