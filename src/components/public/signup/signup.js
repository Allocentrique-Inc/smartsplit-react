import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import SmartSplit from '../../../icons/smartsplit';
import postUser from '../../../api/users/postUser';
import CheckEmailModal from './checkEmailModal/checkEmailModal';
import Checkbox from '../../_/form/checkbox/checkbox';
import FormInput from '../../_/form/formInput/formInput';
import useForm from '../../_/form/useForm';

export default (props) => {
  const { translations, language } = props;
  const [stayConnected, setStayConnected] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const form = useForm({
    email: {
      value: '',
      errors: [],
      validators: ['emailFormat', 'minLength_1'],
    },
    firstName: {
      value: '',
      errors: [],
      validators: ['minLength_1'],
    },
    lastName: {
      value: '',
      errors: [],
      validators: ['minLength_1'],
    },
    artistName: {
      value: '',
      errors: [],
      validators: ['minLength_1'],
    },
    password: {
      value: '',
      errors: [],
      validators: ['minLength_1'],
    },
    termsChecked: {
      value: false,
      errors: [],
      validators: ['shouldBeTrue'],
    },
  });
  const [triedSubmit, setTriedSubmit] = useState(false);

  const history = useHistory();
  const handleSubmit = async () => {
    if (form.isValid()) {
      await postUser({
        ...form.values(),
        locale: props.language,
      });
      setShowModal(true);
    }
    form.reset();
    setTriedSubmit(true);
    setStayConnected(false);
  };

  const t_h1 = translations.publicPages.h1._signup[language];
  const t_p = translations.publicPages.p._signup[language];
  const t_email_label =
    translations.publicPages.form.signup.email._label[language];
  const t_email_placeholder =
    translations.publicPages.form.signup.email._placeholder[language];

  const t_password_label =
    translations.publicPages.form.signup.password._label[language];
  const t_password_placeholder =
    translations.publicPages.form.signup.password.placeholders._password[
      language
    ];
  const t_confirm_password_placeholder =
    translations.publicPages.form.signup.password.placeholders._confirmPassword[
      language
    ];

  const t_firstName_label =
    translations.publicPages.form.signup.firstName._label[language];
  const t_firstName_placeholder =
    translations.publicPages.form.signup.firstName._placeholder[language];
  const t_firstName_hint = ReactHtmlParser(
    translations.publicPages.form.signup.firstName._hint[language],
  );
  const t_lastName_label =
    translations.publicPages.form.signup.lastName._label[language];
  const t_lastName_placeholder =
    translations.publicPages.form.signup.lastName._placeholder[language];
  const t_lastName_hint = ReactHtmlParser(
    translations.publicPages.form.signup.lastName._hint[language],
  );
  const t_artistName_label =
    translations.publicPages.form.signup.artistName._label[language];
  const t_artistName_placeholder =
    translations.publicPages.form.signup.artistName._placeholder[language];
  const t_artistName_hint = ReactHtmlParser(
    translations.publicPages.form.signup.artistName._hint[language],
  );
  const t_terms_checkbox =
    translations.publicPages.checkboxes._termsAndConditions[language];
  const t_stay_logged_checkbox =
    translations.publicPages.checkboxes._stayConnected[language];
  const t_button = translations.publicPages.button._signup[language];
  return (
    <div className="content">
      {showModal && <CheckEmailModal setShowModal={setShowModal} {...props} />}
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>
      <div className="toDo">Creation de compte avec réseau sociaux</div>

      <FormInput errors={form.fields.email.errors} triedSubmit={triedSubmit}>
        <label htmlFor="email">{t_email_label}</label>
        <input
          type="text"
          id="email"
          value={form.fields.email.value}
          onChange={form.handlers.email}
          placeholder={t_email_placeholder}
        />
      </FormInput>
      <div className="row">
        <FormInput
          errors={form.fields.firstName.errors}
          triedSubmit={triedSubmit}
        >
          <label htmlFor="firstName">{t_firstName_label}</label>
          <input
            type="text"
            id="firstName"
            value={form.fields.firstName.value}
            onChange={form.handlers.firstName}
            placeholder={t_firstName_placeholder}
          />
          <div className="hint">{t_firstName_hint}</div>
        </FormInput>
        <FormInput
          errors={form.fields.lastName.errors}
          triedSubmit={triedSubmit}
        >
          <label htmlFor="lastName">{t_lastName_label}</label>
          <input
            type="text"
            id="lastName"
            value={form.fields.lastName.value}
            onChange={form.handlers.lastName}
            placeholder={t_lastName_placeholder}
          />
          <div className="hint">{t_lastName_hint}</div>
        </FormInput>
      </div>
      <FormInput
        errors={form.fields.artistName.errors}
        triedSubmit={triedSubmit}
      >
        <label htmlFor="artistName">{t_artistName_label}</label>
        <input
          type="text"
          id="artistName"
          value={form.fields.artistName.value}
          onChange={form.handlers.artistName}
          placeholder={t_artistName_placeholder}
        />
        <div className="hint">{t_artistName_hint}</div>
      </FormInput>
      <FormInput errors={form.fields.password.errors} triedSubmit={triedSubmit}>
        <label htmlFor="password">{t_password_label}</label>
        <div className="doubleInput">
          <input
            id="password"
            type="password"
            value={form.fields.password.value}
            onChange={form.handlers.password}
            placeholder={t_password_placeholder}
          />
          <div className="toDo">Validation de mot de passe</div>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={t_confirm_password_placeholder}
          />
        </div>
      </FormInput>
      <FormInput
        errors={form.fields.termsChecked.errors}
        triedSubmit={triedSubmit}
      >
        <Checkbox
          checked={form.fields.termsChecked.value}
          onChange={form.handlers.termsChecked}
          label={t_terms_checkbox}
        />
      </FormInput>

      <div className="buttons">
        <Checkbox
          checked={stayConnected}
          onChange={() => setStayConnected(!stayConnected)}
          label={t_stay_logged_checkbox}
        />
        <button onClick={handleSubmit} className="btn-primary">
          {t_button}
        </button>
      </div>
    </div>
  );
};
