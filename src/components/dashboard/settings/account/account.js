import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import PhoneNumber from '../../../_/form/phoneNumber/phoneNumber';
import FormInput from '../../../_/form/formInput/formInput';

export default function Account(props) {
  const { form, updateUser, translations, language, triedSubmit } = props;

  const commonProps = {
    language,
    triedSubmit,
  };

  const t_h2 = translations.settings.titles._account[language];
  const t_address_label = translations.settings.fields.address._label[language];
  const t_locale_label = translations.settings.fields.locale._label[language];
  const t_locale_french =
    translations.settings.fields.locale.options._french[language];
  const t_locale_english =
    translations.settings.fields.locale.options._english[language];
  const t_phone_number_label =
    translations.settings.fields.phoneNumber._label[language];
  const t_emails_label = translations.settings.fields.emails._label[language];
  return (
    <div className="account" id="account">
      <h2>{t_h2}</h2>
      <FormInput errors={form.fields.address.errors} {...commonProps}>
        <label htmlFor="address">{t_address_label}</label>
        <input
          id="address"
          type="text"
          value={form.fields.address.value}
          onChange={form.handlers.address}
          onBlur={updateUser}
        />
      </FormInput>
      <FormInput errors={form.fields.locale.errors} {...commonProps}>
        <label htmlFor="locale">{t_locale_label}</label>
        <select
          id="locale"
          value={form.fields.locale.value}
          onChange={form.handlers.locale}
          onBlur={updateUser}
        >
          <option value="fr">{t_locale_french}</option>
          <option value="en">{t_locale_english}</option>
        </select>
      </FormInput>

      <FormInput
        errors={form.fields.phoneNumber.errors}
        {...commonProps}
        className="toDo"
      >
        {' '}
        <label htmlFor="phoneNumber">{t_phone_number_label}</label>
        <PhoneNumber
          id="phoneNumber"
          type="text"
          value={form.fields.phoneNumber.value}
          onChange={form.handlers.phoneNumber}
          onBlur={updateUser}
        />
      </FormInput>

      <FormInput
        errors={form.fields.emails.errors}
        {...commonProps}
        className="toDo"
      >
        <label htmlFor="emails">{t_emails_label}</label>
        <MultiSelect
          id="emails"
          value={form.fields.emails.value}
          onChange={form.handlers.emails}
          onBlur={updateUser}
        />
      </FormInput>
    </div>
  );
}
