import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import PhoneNumber from '../../../_/form/phoneNumber/phoneNumber';

export default function Account(props) {
  const { account, setField, updateUser, translations, language } = props;
  const t_title = translations.titles._profile[language];
  const t_fields = translations.fields;
  return (
    <div className="account" id="account">
      <h2>{t_title}</h2>
      <div className="formInput">
        <label htmlFor="address">{t_fields.address._label[language]}</label>
        <input
          id="address"
          type="text"
          value={account.address}
          onChange={(e) => setField('account', { address: e.target.value })}
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
        <label htmlFor="locale">{t_fields.locale._label[language]}</label>
        <input
          id="locale"
          type="text"
          value={account.locale}
          onChange={(e) => setField('account', { locale: e.target.value })}
          onBlur={updateUser}
        />
      </div>
      <div className="formInput">
        <label htmlFor="phoneNumber">
          {t_fields.phoneNumber._label[language]}
        </label>
        <PhoneNumber
          id="phoneNumber"
          type="text"
          value={account.phoneNumber}
          onChange={(value) =>
            setField('account', {
              phoneNumber: value,
            })
          }
          onBlur={updateUser}
        />
      </div>
      <div className="formInput toDo">
        <label htmlFor="emails">{t_fields.emails._label[language]}</label>
        <MultiSelect
          id="emails"
          value={account.emails}
          onChange={(value) => setField('account', { emails: value })}
          onBlur={updateUser}
        />
      </div>
    </div>
  );
}
