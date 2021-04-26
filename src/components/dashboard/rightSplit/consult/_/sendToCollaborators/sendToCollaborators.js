import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MobileTopBar from '../../../../_/mobileTopBar/mobileTopBar';
import useForm from '../../../../../_/form/useForm';
import FormInput from '../../../../../_/form/formInput/formInput';
import submitRightSplit from '../../../../../../api/workpieces/submitRightSplit';

export default function SendToCollaborators(props) {
  const {
    setShowSendToCollab,
    t_send,
    activeCollaborators,
    language,
    translations,
    resetData,
  } = props;
  const { workpiece_id } = useParams();
  const initForm = {};
  const collaborators = [];
  activeCollaborators.forEach(({ rightHolder }) => {
    initForm[rightHolder.user_id] = {
      value: rightHolder.emails[0] || '',
      errors: [],
      validators: ['emailFormat', 'required'],
    };
    collaborators.push(rightHolder);
  });
  const form = useForm(initForm);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const handleSend = async () => {
    if (form.isValid()) {
      const result = await submitRightSplit({
        workpiece_id,
        emails: form.toJS(),
      });
      if (result === '') {
        await resetData();
        setShowSendToCollab(false);
      } else {
        Object.keys(form.fields).forEach((key) => {
          !form.fields[key].errors.includes('badRequest') &&
            form.fields[key].errors.push('badRequest');
        });
        form.setFields({ ...form.fields });
      }
    }

    setTriedSubmit(true);
  };

  const t_title = translations.rightSplit.summary.adjustEmail._title[language];
  const t_presentation =
    translations.rightSplit.summary.adjustEmail._presentation[language];

  const commonProps = {
    language,
    triedSubmit,
  };
  return (
    <div className="sendToCollaborators">
      <MobileTopBar
        back={() => setShowSendToCollab(false)}
        action={
          <button className="btn-secondary" onClick={handleSend}>
            {t_send}
          </button>
        }
      >
        {t_title}
      </MobileTopBar>
      <div className="content">
        <p>{t_presentation}</p>
        {collaborators.map(({ user_id, artistName, firstName, lastName }) => (
          <FormInput
            errors={form.fields[user_id].errors}
            {...commonProps}
            key={user_id}
          >
            <label htmlFor={user_id}>
              {artistName || `${firstName} ${lastName}`}
            </label>
            <input
              id={user_id}
              value={form.fields[user_id].value}
              onChange={form.handlers[user_id]}
            />
          </FormInput>
        ))}
      </div>
    </div>
  );
}
