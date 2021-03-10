import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import requestPasswordReset from '../../../api/users/requestPasswordReset';
import useForm from '../../_/form/useForm';
import FormInput from '../../_/form/formInput/formInput';

export default ({ translations, language }) => {
  const form = useForm({
    email: {
      value: '',
      errors: [],
      validators: ['emailFormat', 'required'],
    },
  });
  const [triedSubmit, setTriedSubmit] = useState(false);
  const history = useHistory();
  const handleSubmit = async () => {
    if (form.isValid()) {
      const result = await requestPasswordReset(form.toJS());
      if (result.error) {
        form.fields.email.errors.push(result.message);
        form.setField('email', { errors: form.fields.email.errors });
      } else {
        history.push('/user/password-reset-confirmation');
      }
    }
    setTriedSubmit(true);
  };
  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);

  const commonProps = {
    language,
    errorTranslations: translations.publicPages.formErrors,
    triedSubmit,
  };

  const t_h1 = translations.publicPages.h1._requestPasswordReset[language];
  const t_p = translations.publicPages.p._requestPasswordReset[language];
  const t_link = translations.publicPages._signupLink[language];
  const t_button =
    translations.publicPages.button._requestPasswordReset[language];
  const t_email_label =
    translations.publicPages.form.requestPasswordReset.email._label[language];
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
        />
      </FormInput>
      <div className="buttons">
        <Link to="/signup">{t_link}</Link>
        <button onClick={handleSubmit} className="btn-primary">
          {t_button}
        </button>
      </div>
    </div>
  );
};
