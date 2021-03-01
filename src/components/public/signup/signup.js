import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import SmartSplit from '../../../icons/smartsplit';
import postUser from '../../../api/users/postUser';
import CheckEmailModal from './checkEmailModal/checkEmailModal';
import Checkbox from '../../_/form/checkbox/checkbox';

export default (props) => {
  const { translations, language } = props;
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = async () => {
    const result = await postUser({
      email,
      firstName,
      lastName,
      artistName,
      password,
      locale: props.language,
      // SHOULD INCLUDE LANGUAGE
    });
    setShowModal(true);
    setEmail('');
    setFirstName('');
    setLastName('');
    setArtistName('');
    setPassword('');
    setConfirmPassword('');
    setTermsChecked(false);
    setStayConnected(false);
  };

  const isPasswordValid = () => password === confirmPassword && password !== '';

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
    <div className="form">
      {showModal && <CheckEmailModal setShowModal={setShowModal} {...props} />}
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>
      <div className="toDo">Creation de compte avec réseau sociaux</div>

      <div className="formInput">
        <label htmlFor="email">{t_email_label}</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder={t_email_placeholder}
        />
      </div>
      <div className="row">
        <div className="formInput">
          <label htmlFor="firstName">{t_firstName_label}</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t_firstName_placeholder}
          />
          <div className="hint">{t_firstName_hint}</div>
        </div>
        <div className="formInput">
          <label htmlFor="lastName">{t_lastName_label}</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t_lastName_placeholder}
          />
          <div className="hint">{t_lastName_hint}</div>
        </div>
      </div>
      <div className="formInput">
        <label htmlFor="artistName">{t_artistName_label}</label>
        <input
          type="text"
          id="artistName"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder={t_artistName_placeholder}
        />
        <div className="hint">{t_artistName_hint}</div>
      </div>
      <div className="formInput">
        <label htmlFor="password">{t_password_label}</label>
        <div className="doubleInput">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </div>
      <Checkbox
        checked={termsChecked}
        onChange={() => setTermsChecked(!termsChecked)}
        label={t_terms_checkbox}
      />

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
