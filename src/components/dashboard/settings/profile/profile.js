import MultiSelect from '../../../_/form/multiSelect/multiSelect';

export default function Profile(props) {
  const { profile, setField, updateUser } = props;
  return (
    <div className="profile">
      <h2>Profil</h2>
      <input
        value={profile.avatar}
        className="toDo"
        onChange={(e) => setField('profile', { avatar: e.target.value })}
        onBlur={updateUser}
      />
      <div className="row">
        <div className="formInput">
          <label htmlFor="firstName">Mon prénom</label>
          <input
            type="text"
            id="firstName"
            value={profile.firstName}
            onChange={(e) => setField('profile', { firstName: e.target.value })}
            onBlur={updateUser}
          />
        </div>
        <div className="formInput">
          <label htmlFor="lastName">Mon nom</label>
          <input
            type="text"
            id="lastName"
            value={profile.lastName}
            onChange={(e) => setField('profile', { lastName: e.target.value })}
            onBlur={updateUser}
          />
        </div>
      </div>
      <div className="formInput">
        <label htmlFor="artistName">Mon nom d'artiste</label>
        <input
          type="text"
          id="artistName"
          value={profile.artistName}
          onChange={(e) => setField('profile', { artistName: e.target.value })}
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
        <label htmlFor="projects">Mes participations à des entités</label>
        <MultiSelect
          id="projects"
          value={profile.projects}
          onChange={(value) => setField('profile', { projects: value })}
          onBlur={updateUser}
        />
      </div>
    </div>
  );
}
