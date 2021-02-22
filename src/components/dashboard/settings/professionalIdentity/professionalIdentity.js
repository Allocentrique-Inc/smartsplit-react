import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import ProIdSelect from './_/proIdSelect/proIdSelect';

export default function ProfessionalIdentity(props) {
  const { professionalIdentity, setField, updateUser } = props;
  return (
    <div className="professionalIdentity" id="professional-identity">
      <h2>Identité professionnelle</h2>
      <div className="formInput">
        <label htmlFor="organisations">Mes entreprises liées</label>
        <MultiSelect
          id="organisations"
          value={professionalIdentity.organisations}
          onChange={(value) =>
            setField('professionalIdentity', { organisations: value })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
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
      <div className="formInput">
        <label htmlFor="birthDate">Ma date de naissance</label>
        <input
          id="birthDate"
          type="date"
          value={professionalIdentity.birthDate}
          onChange={(e) =>
            setField('professionalIdentity', { birthDate: e.target.value })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
        <label htmlFor="isni">Mon ISNI</label>
        <input
          id="isni"
          type="text"
          value={professionalIdentity.isni}
          onChange={(e) =>
            setField('professionalIdentity', { isni: e.target.value })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
        <label htmlFor="uri">Mon URI</label>
        <input
          id="uri"
          type="text"
          value={professionalIdentity.uri}
          onChange={(e) =>
            setField('professionalIdentity', { uri: e.target.value })
          }
          onBlur={updateUser}
        />
      </div>
    </div>
  );
}
