import * as PropTypes from 'prop-types';

const ArtistName = (props) => {
  const { user, language, children, className } = props;
  let properName;
  if (!user) return null;

  return (
    <>
      {children}
      <span className={className}> {
      user.artistName
        ? user.artistName
      : `${user.firstName} ${user.lastName}`
     }
      </span>
    </>
  );
};
ArtistName.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  className: PropTypes.string,
};
ArtistName.defaultProps = {
  // eslint-disable-next-line react/forbid-prop-types
  user: null,
  className: 'artistName',
};
export default ArtistName;
