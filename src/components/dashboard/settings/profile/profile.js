import MultiSelect from '../../../_/form/multiSelect/multiSelect';

export default function Profile(props) {
  const { profile, setField, updateUser, translations, language } = props;
  return (
    <div className="profile" id="profile">
      <h2>{translations.titles._profile[language]}</h2>
      <input
        value={profile.avatar}
        className="toDo"
        onChange={(e) => setField('profile', { avatar: e.target.value })}
        onBlur={updateUser}
      />
      <div className="row">
        <div className="formInput">
          <label htmlFor="firstName">
            {translations.fields.firstName._label[language]}
          </label>
          <input
            type="text"
            id="firstName"
            value={profile.firstName}
            onChange={(e) => setField('profile', { firstName: e.target.value })}
            onBlur={updateUser}
            placeholder={translations.fields.firstName._placeholder[language]}
          />
          <div className="hint">
            {translations.fields.firstName._hint[language]}
          </div>
        </div>
        <div className="formInput">
          <label htmlFor="lastName">
            {translations.fields.lastName._label[language]}
          </label>
          <input
            type="text"
            id="lastName"
            value={profile.lastName}
            onChange={(e) => setField('profile', { lastName: e.target.value })}
            onBlur={updateUser}
            placeholder={translations.fields.lastName._placeholder[language]}
          />
          <div className="hint">
            {translations.fields.lastName._hint[language]}
          </div>
        </div>
      </div>
      <div className="formInput">
        <label htmlFor="artistName">
          {translations.fields.artistName._label[language]}
        </label>
        <input
          type="text"
          id="artistName"
          value={profile.artistName}
          onChange={(e) => setField('profile', { artistName: e.target.value })}
          onBlur={updateUser}
          placeholder={translations.fields.artistName._placeholder[language]}
        />
        <div className="hint">
          {translations.fields.artistName._hint[language]}
        </div>
      </div>
      <div className="formInput toDo">
        <label htmlFor="projects">
          {translations.fields.projects._label[language]}
        </label>
        <MultiSelect
          id="projects"
          value={profile.projects}
          onChange={(value) => setField('profile', { projects: value })}
          onBlur={updateUser}
          placeholder={translations.fields.projects._placeholder[language]}
        />
      </div>
    </div>
  );
}
