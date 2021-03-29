import * as PropTypes from 'prop-types';

const ArtistName = (props) => {
  const { user, language, children } = props;
  let properName;
  if (!user) return null;

  return (
    <>
      {children}
      <span className="artistName"> {
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
};
ArtistName.defaultProps = {
  // eslint-disable-next-line react/forbid-prop-types
  user: null,
};
export default ArtistName;
