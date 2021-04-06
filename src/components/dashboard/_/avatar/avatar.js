import PropTypes from 'prop-types';

const Avatar = (props) => {
  const { className, user, color, ...nextProps } = props;
  if (!user) return null;
  const initials =
    user && user.firstName && user.lastName
      ? user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
      : '';
  const hasImage = user.avatarUrl;
  const backgroundColor = color || 'inherit';
  return (
    <div className={`avatar ${className}`} title={user.fullName} {...nextProps}>
      {hasImage && (
        <img
          src={user.avatar ? user.avatar : user.avatarUrl}
          alt={user.artistName ? user.artistName : user.fullName}
        />
      )}
      {!hasImage && (
        <div className="avatar-placeholder" style={{ backgroundColor }}>
          <span>{initials}</span>
        </div>
      )}
    </div>
  );
};
Avatar.propTypes = {
  className: PropTypes.string,
};
Avatar.defaultProps = {
  className: '',
};
export default Avatar;
