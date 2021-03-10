import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import changePassword from '../../../api/users/changePassword';
import useForm from '../../_/form/useForm';
import FormInput from '../../_/form/formInput/formInput';

export default ({ translations, language }) => {
  const { token } = useParams();
  const history = useHistory();
  const form = useForm({
    password: {
      value: '',
      errors: [],
      validators: ['minLength_8'],
    },
    confirmPassword: {
      value: '',
      errors: [],
      validators: ['shouldMatch_password'],
      excluded: true,
    },
  });
  const [triedSubmit, setTriedSubmit] = useState(false);
  const handleSubmit = async () => {
    if (form.isValid()) {
      const result = await changePassword({ ...form.toJS(), token });
      console.log('CHANGE PASSWORD', result);
      history.push('/');
    }
    setTriedSubmit(true);
  };

  const commonProps = {
    language,
    errorTranslations: translations.publicPages.formErrors,
    triedSubmit,
  };

  const t_h1 = translations.publicPages.h1._changePassword[language];
  const t_button = translations.publicPages.button._changePassword[language];

  const t_password_label =
    translations.publicPages.form.changePassword.password._label[language];
  const t_password_placeholder =
    translations.publicPages.form.changePassword.password._placeholder[
      language
    ];
  const t_confirm_password_label =
    translations.publicPages.form.changePassword.confirmPassword._label[
      language
    ];

  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);

  return (
    <div className="content">
      <h1 className="header">{t_h1}</h1>
      <FormInput errors={form.fields.password.errors} {...commonProps}>
        <label htmlFor="password">{t_password_label}</label>
        <input
          type="password"
          id="password"
          value={form.fields.password.value}
          onChange={form.handlers.password}
          placeholder={t_password_placeholder}
        />
        <div className="toDo">Validation de mot de passe</div>
      </FormInput>
      <FormInput errors={form.fields.confirmPassword.errors} {...commonProps}>
        <label htmlFor="confirmPassword">{t_confirm_password_label}</label>
        <input
          id="confirmPassword"
          type="password"
          value={form.fields.confirmPassword.value}
          onChange={form.handlers.confirmPassword}
        />
      </FormInput>
      <div className="buttons">
        <div />
        <button className="btn-primary" onClick={handleSubmit}>
          {t_button}
        </button>
      </div>
    </div>
  );
};
