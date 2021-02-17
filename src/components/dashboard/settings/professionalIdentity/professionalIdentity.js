import MultiSelect from '../../../_/form/multiSelect/multiSelect';

export default function ProfessionalIdentity(props) {
  const { professionalIdentity, setField } = props;
  return (
    <div className="professionalIdentity">
      <h2>Identité professionnelle</h2>
      <div className="formInput">
        <label htmlFor="organisations">Mes entreprises liées</label>
        <MultiSelect
          id="organisations"
          value={professionalIdentity.organisations}
          onChange={(e) =>
            setField('professionalIdentity', { organisations: e.target.value })
          }
        />
      </div>
    </div>
  );
}
