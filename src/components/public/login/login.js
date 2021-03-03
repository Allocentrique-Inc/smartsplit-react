import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import login from '../../../api/auth/login';
import SmartSplit from '../../../icons/smartsplit';
import Checkbox from '../../_/form/checkbox/checkbox';
import useForm from '../../_/form/useForm';
import FormInput from '../../_/form/formInput/formInput';

const Login = ({ translations, language }) => {
  const form = useForm({
    email: {
      value: '',
      errors: [],
      validators: ['emailFormat', 'minLength_1'],
    },
    password: {
      value: '',
      errors: [],
      validators: ['minLength_1'],
    },
  });
  const [triedSubmit, setTriedSubmit] = useState(false);
  const history = useHistory();
  const [stayConnected, setStayConnected] = useState(false);
  const handleConfirm = async () => {
    if (form.isValid()) {
      await login(form.toJS());
      history.push('/');
      form.reset();
    }
    setTriedSubmit(true);
  };

  const commonProps = {
    language,
    errorTranslations: translations.publicPages.formErrors,
    triedSubmit,
  };

  const t_h1 = translations.publicPages.h1._login[language];
  const t_p = translations.publicPages.p._login[language];
  const t_email_label =
    translations.publicPages.form.login.email._label[language];
  const t_email_placeholder =
    translations.publicPages.form.login.email._placeholder[language];
  const t_password_label =
    translations.publicPages.form.login.password._label[language];
  const t_forgot_password_link =
    translations.publicPages.form.login.password._hint[language];
  const t_checkbox =
    translations.publicPages.checkboxes._stayConnected[language];
  const t_button = translations.publicPages.button._login[language];

  return (
    <div className="content">
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>
      <FormInput errors={form.fields.email.errors} {...commonProps}>
        <label htmlFor="email">{t_email_label}</label>
        <input
          id="email"
          value={form.fields.email.value}
          onChange={form.handlers.email}
          placeholder={t_email_placeholder}
        />
      </FormInput>
      <FormInput errors={form.fields.password.errors} {...commonProps}>
        <label htmlFor="password">{t_password_label}</label>
        <input
          id="password"
          value={form.fields.password.value}
          type="password"
          onChange={form.handlers.password}
        />
        <Link to="/user/request-password-reset">{t_forgot_password_link}</Link>
      </FormInput>
      <div className="buttons">
        <div className="checkbox">
          <input
            type="checkbox"
            id="stayConnected"
            name="stayConnected"
            value="true"
          />
          <Checkbox
            checked={stayConnected}
            onChange={() => setStayConnected(!stayConnected)}
            label={t_checkbox}
          />
        </div>
        <button onClick={handleConfirm} className="btn-primary">
          {t_button}
        </button>
      </div>
    </div>
  );
};

export default Login;
