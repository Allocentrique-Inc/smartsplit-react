import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import ProIdSelect from './_/proIdSelect/proIdSelect';
import FormInput from '../../../_/form/formInput/formInput';

export default function ProfessionalIdentity(props) {
  const { form, updateUser, translations, language, triedSubmit } = props;

  const commonProps = {
    language,
    triedSubmit,
  };
  const t_h2 = translations.settings.titles._professionalIdentity[language];
  const t_organisations_label =
    translations.settings.fields.organisations._label[language];
  const t_professional_identity_label =
    translations.settings.fields.professionalIdentity._label[language];
  const t_birth_date_label =
    translations.settings.fields.birthDate._label[language];
  const t_birth_date_placeholder =
    translations.settings.fields.birthDate._placeholder[language];
  const t_isni_label = translations.settings.fields.isni._label[language];
  const t_uri_label = translations.settings.fields.uri._label[language];
  const t_uri_placeholder =
    translations.settings.fields.uri._placeholder[language];
  return (
    <div className="professionalIdentity" id="professional-identity">
      <h2>{t_h2}</h2>

      <FormInput
        errors={form.fields.organisations.errors}
        {...commonProps}
        className="toDo"
      >
        <label htmlFor="organisations">{t_organisations_label}</label>
        <MultiSelect
          id="organisations"
          value={form.fields.organisations.value}
          onChange={form.handlers.organisations}
          onBlur={updateUser}
        />
      </FormInput>
      <FormInput
        errors={form.fields.professionalIdentity.errors}
        {...commonProps}
        className="toDo"
      >
        <label htmlFor="professionalIdentity">
          {t_professional_identity_label}
        </label>
        <ProIdSelect
          id="professionalIdentity"
          value={form.fields.professionalIdentity.value}
          onChange={form.handlers.professionalIdentity}
          onBlur={updateUser}
        />
      </FormInput>
      <FormInput errors={form.fields.birthDate.errors} {...commonProps}>
        <label htmlFor="birthDate">{t_birth_date_label}</label>
        <input
          type="date"
          id="birthDate"
          value={form.fields.birthDate.value}
          onChange={form.handlers.birthDate}
          onBlur={updateUser}
          placeholder={t_birth_date_placeholder}
        />
      </FormInput>
      <FormInput
        errors={form.fields.isni.errors}
        {...commonProps}
        className="isni"
      >
        <label htmlFor="isni">{t_isni_label}</label>
        <input
          id="isni"
          type="text"
          value={form.fields.isni.value}
          onChange={form.handlers.isni}
          onBlur={updateUser}
        />
      </FormInput>
      <FormInput errors={form.fields.uri.errors} {...commonProps}>
        <label htmlFor="uri">{t_uri_label}</label>
        <input
          id="uri"
          type="text"
          value={form.fields.uri.value}
          onChange={form.handlers.uri}
          onBlur={updateUser}
          placeholder={t_uri_placeholder}
        />
      </FormInput>
    </div>
  );
}
