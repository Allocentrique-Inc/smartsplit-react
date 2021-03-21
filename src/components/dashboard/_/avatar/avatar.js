import PropTypes from 'prop-types';
import Config from '../../../../config';

const Avatar = (props) => {
  const { className } = props;
  const { user, color } = props;
  const initials =
    user && user.firstName && user.lastName
      ? user.firstName.substr(0, 1) + user.lastName.substr(0, 1)
      : '';
  const hasImage = user.avatarUrl;
  const backgroundColor = color || 'inherit';
  console.log(color);
  return (
    <div className={`avatar ${className}`} title={user.fullName}>
      {hasImage && (
        <img
          src={user.avatar ? user.avatar : user.avatarUrl}
          alt={user.fullName}
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
