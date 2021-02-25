import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import ProIdSelect from './_/proIdSelect/proIdSelect';

export default function ProfessionalIdentity(props) {
  const {
    professionalIdentity,
    setField,
    updateUser,
    translations,
    language,
  } = props;
  return (
    <div className="professionalIdentity" id="professional-identity">
      <h2>{translations.titles._professionalIdentity[language]}</h2>
      <div className="formInput toDo">
        <label htmlFor="organisations">
          {translations.fields.organisations._label[language]}
        </label>
        <MultiSelect
          id="organisations"
          value={professionalIdentity.organisations}
          onChange={(value) =>
            setField('professionalIdentity', { organisations: value })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput toDo">
        <label htmlFor="professionalIdentity">
          Mes identifiants professionnels
        </label>
        <ProIdSelect
          id="professionalIdentity"
          value={professionalIdentity.professionalIdentity}
          onChange={(value) =>
            setField('professionalIdentity', { professionalIdentity: value })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput birthDate">
        <label htmlFor="birthDate">
          {translations.fields.birthDate._label[language]}
        </label>
        <input
          id="birthDate"
          type="date"
          value={professionalIdentity.birthDate}
          onChange={(e) =>
            setField('professionalIdentity', { birthDate: e.target.value })
          }
          onBlur={updateUser}
          placeholder={translations.fields.birthDate._placeholder[language]}
        />
      </div>
      <div className="formInput isni">
        <label htmlFor="isni">
          {translations.fields.isni._label[language]}
        </label>{' '}
        <input
          id="isni"
          type="text"
          value={professionalIdentity.isni}
          onChange={(e) =>
            setField('professionalIdentity', { isni: e.target.value })
          }
          onBlur={updateUser}
          placeholder={translations.fields.isni._placeholder[language]}
        />
      </div>
      <div className="formInput">
        <label htmlFor="uri">{translations.fields.uri._label[language]}</label>{' '}
        <input
          id="uri"
          type="text"
          value={professionalIdentity.uri}
          onChange={(e) =>
            setField('professionalIdentity', { uri: e.target.value })
          }
          onBlur={updateUser}
          placeholder={translations.fields.uri._placeholder[language]}
        />
      </div>
    </div>
  );
}
