import MultiSelect from '../../../_/form/multiSelect/multiSelect';
import PhoneNumber from '../../../_/form/phoneNumber/phoneNumber';

export default function Account(props) {
  const { account, setField } = props;
  return (
    <div className="account">
      <h2>Compte</h2>
      <div className="formInput">
        <label htmlFor="address">Mon adresse civique</label>
        <input
          id="address"
          type="text"
          value={account.address}
          onChange={(e) => setField('account', { address: e.target.value })}
        />
      </div>
      <div className="formInput">
        <label htmlFor="locale">Ma langue</label>
        <input
          id="locale"
          type="text"
          value={account.locale}
          onChange={(e) => setField('account', { locale: e.target.value })}
        />
      </div>
      <div className="formInput">
        <label htmlFor="mobilePhone">Mon téléphone mobile</label>
        <PhoneNumber
          id="mobilePhone"
          type="text"
          value={account.mobilePhone}
          onChange={(e) => setField('account', { mobilePhone: e.target.value })}
        />
      </div>
      <div className="formInput">
        <label htmlFor="emails">Mes courrier liés à ce compte</label>
        <MultiSelect
          id="emails"
          value={account.emails}
          onChange={(value) => setField('account', { emails: value })}
        />
      </div>
    </div>
  );
}
