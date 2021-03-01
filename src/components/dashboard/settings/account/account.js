import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import PhoneNumber from '../../../_/form/phoneNumber/phoneNumber';

export default function Account(props) {
  const { account, setField, updateUser, translations, language } = props;
  return (
    <div className="account" id="account">
      <h2>{translations.titles._account[language]}</h2>
      <div className="formInput">
        <label htmlFor="address">
          {translations.fields.address._label[language]}
        </label>
        <input
          id="address"
          type="text"
          value={account.address}
          onChange={(e) => setField('account', { address: e.target.value })}
          onBlur={updateUser}
        />
      </div>
      <div className="formInput locale">
        <label htmlFor="locale">
          {translations.fields.locale._label[language]}
        </label>
        <select
          id="locale"
          value={account.locale}
          onChange={(e) => {
            setField('account', { locale: e.target.value });
          }}
          onBlur={updateUser}
        >
          <option value="fr">
            {translations.fields.locale.options._french[language]}
          </option>
          <option value="en">
            {translations.fields.locale.options._english[language]}
          </option>
        </select>
      </div>
      <div className="formInput phoneNumber">
        <label htmlFor="phoneNumber">
          {translations.fields.phoneNumber._label[language]}
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
        <label htmlFor="emails">
          {translations.fields.emails._label[language]}
        </label>
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
