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
    });
    setShowModal(true);
    setEmail('');
    setFirstName('');
    setLastName('');
    setArtistName('');
    setPassword('');
    setConfirmPassword('');
  };

  const isPasswordValid = () => password === confirmPassword && password !== '';
  return (
    <div className="form">
      {showModal && <CheckEmailModal setShowModal={setShowModal} {...props} />}
      <div className="header">
        <h1>{translations.h1._signup[language]}</h1>
        <p>{translations.p._signup[language]}</p>
      </div>
      <div className="toDo">Creation de compte avec réseau sociaux</div>

      <div className="formInput">
        <label htmlFor="email">
          {translations.fields.signup.email._label[language]}
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder={translations.fields.signup.email._placeholder[language]}
        />
      </div>
      <div className="row">
        <div className="formInput">
          <label htmlFor="firstName">
            {translations.fields.signup.firstName._label[language]}
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={
              translations.fields.signup.firstName._placeholder[language]
            }
          />
          <div className="hint">
            {ReactHtmlParser(
              translations.fields.signup.firstName._hint[language],
            )}
          </div>
        </div>
        <div className="formInput">
          <label htmlFor="lastName">
            {translations.fields.signup.lastName._label[language]}
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={
              translations.fields.signup.lastName._placeholder[language]
            }
          />
          <div className="hint">
            {ReactHtmlParser(
              translations.fields.signup.lastName._hint[language],
            )}
          </div>
        </div>
      </div>
      <div className="formInput">
        <label htmlFor="artistName">
          {translations.fields.signup.artistName._label[language]}
        </label>
        <input
          type="text"
          id="artistName"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder={
            translations.fields.signup.artistName._placeholder[language]
          }
        />
        <div className="hint">
          {ReactHtmlParser(
            translations.fields.signup.artistName._hint[language],
          )}
        </div>
      </div>
      <div className="formInput">
        <label htmlFor="password">
          {translations.fields.signup.password._label[language]}
        </label>
        <div className="doubleInput">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={
              translations.fields.signup.password.placeholders._password[
                language
              ]
            }
          />
          <div className="toDo">Validation de mot de passe</div>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={
              translations.fields.signup.password.placeholders._confirmPassword[
                language
              ]
            }
          />
        </div>
      </div>
      <Checkbox
        checked={termsChecked}
        onChange={() => setTermsChecked(!termsChecked)}
        label={translations.checkboxes._termsAndConditions[language]}
      />

      <div className="buttons">
        <Checkbox
          checked={stayConnected}
          onChange={() => setStayConnected(!stayConnected)}
          label={translations.checkboxes._stayConnected[language]}
        />
        <button onClick={handleSubmit} className="btn-primary">
          Créer mon compte
        </button>
      </div>
    </div>
  );
};
