const ArtistName = (props) => {
  const { user, language, children, className } = props;
  let properName;
  if (!user) return null;

  return (
    <>
      {children}
      <span className={className}>
        {' '}
        {user.artistName
          ? user.artistName
          : `${user.firstName} ${user.lastName}`}
      </span>
    </>
  );
};

export default ArtistName;
