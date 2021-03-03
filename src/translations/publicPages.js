import { Link } from 'react-router-dom';

export default {
  topBar: {
    signup: {
      _span: {
        fr: 'Déjà membre ?',
        en: 'Already a member ?',
      },
      _link: {
        fr: 'Ouvrir une session',
        en: 'Open a session',
      },
    },
    login: {
      _span: {
        fr: 'Pas encore membre ?',
        en: 'No account ?',
      },
      _link: {
        fr: 'Créer mon compte',
        en: 'Create my account',
      },
    },
  },
  h1: {
    _requestPasswordReset: {
      fr: 'Réinitialise ton mot de passe.',
      en: 'Reset your password.',
    },
    _passwordResetConfirmation: {
      fr: 'Courriel envoyé.',
      en: 'Email sent.',
    },
    _changePassword: {
      fr: 'Réinitialise ton mot de passe.',
      en: 'Reset your password.',
    },
    _signup: {
      fr: 'En route vers la professionnalisation.',
      en: 'On the way to professionalization',
    },
    _login: {
      fr: 'Connecte-toi à ton compte Smartsplit.',
      en: 'Login to your Smartsplit account.',
    },
  },
  p: {
    _requestPasswordReset: {
      fr:
        'Saisis l’adresse courriel lié à ton compte pour obtenir le lien de réinitialisation.',
      en:
        'Enter the email address associated to your account to get the reset link.',
    },
    _passwordResetConfirmation: {
      fr:
        'Un courriel a été envoyé ou sera envoyé sous peu. Il contient un lien de réinitialisation de ton mot de passe.',
      en:
        'An email was sent or will be sent shortly. It includes a link to reset your password.',
    },
    _signup: {
      fr:
        'Tu es à un clic de pouvoir documenter ta musique et de partager tes droits avec tes contributeurs.',
      en:
        'You  are one click away from documenting your music and share your rights with your contributors.',
    },
    _login: {
      fr: 'Entre tes informations ci-dessous.',
      en: 'Enter your information below.',
    },
  },
  _signupLink: {
    fr: 'Je n’ai pas de compte',
    en: "I don't have an account",
  },
  button: {
    _requestPasswordReset: {
      fr: 'Envoyer',
      en: 'Send',
    },
    _passwordResetConfirmation: {
      fr: 'Retourner à la page d’accueil',
      en: 'Go back to the homepage',
    },
    _changePassword: {
      fr: 'Réinitialiser',
      en: 'Reset',
    },
    _signup: {
      fr: 'Créer mon compte',
      en: 'Create my account',
    },
    _login: {
      fr: 'Me connecter',
      en: 'Connect',
    },
  },
  checkboxes: {
    _termsAndConditions: {
      fr:
        'J’ai lu et j’accepte les Termes et conditions d’utilisation  et la Politique sur la vie privée de Smartsplit.',
      en:
        "I have read and accept the Terms and Conditions of use as well as Smartsplit's Private Life Policy.",
    },
    _stayConnected: {
      fr: 'Rester connecté',
      en: 'Stay connected',
    },
  },
  formErrors: {
    _shouldMatchEmailFormat: {
      fr: "Le format de l'adresse courriel est invalide",
      en: 'Email address is in an invalid format',
    },
    _shouldBeTrue: {
      fr:
        "Tu dois accepter les les Termes et conditions d'utilisation et la Politique sur la vie privée de Smartsplit",
      en:
        'You must agree to the Terms and Conditions of Use and the Privacy Policy of Smartsplit',
    },
    _emailConflict: {
      fr: () => (
        <>
          Ce courriel est déjà utilisé. As-tu{' '}
          <Link to="/user/request-password-reset">
            oublié ton mot de passe?
          </Link>
        </>
      ),
      en: () => (
        <>
          This email is already in use. Have you{' '}
          <Link to="/user/request-password-reset">
            forgotten your password?
          </Link>
        </>
      ),
    },
    _shouldNotBeEmpty: {
      fr: 'Ce champ est obligatoire',
      en: 'This field is required',
    },
    _shouldBeAtLeast8CharLong: {
      fr: 'Le mot de passe doit faire au moins 8 caractères',
      en: 'Password must be at least 8 characters long',
    },
    _shouldMatchPassword: {
      fr: 'Les mots de passe doivent être identiques',
      en: 'Passwords must match',
    },
  },
  form: {
    requestPasswordReset: {
      email: {
        _label: {
          fr: 'Courriel',
          en: 'Email',
        },
      },
    },
    changePassword: {
      password: {
        _label: {
          fr: 'Choisis ton nouveau mot de passe',
          en: 'Choose your new password',
        },
        _placeholder: {
          fr: '8 caractères minimum',
          en: '8 characters minimum',
        },
      },
      confirmPassword: {
        _label: {
          fr: 'Confirme ton nouveau mot de passe',
          en: 'Confirm your new password',
        },
      },
    },
    signup: {
      email: {
        _label: {
          fr: 'Entre ton courriel',
          en: 'Enter your email',
        },
        _placeholder: {
          fr: 'tonnom@exemple.com',
          en: 'name@example.com',
        },
      },
      password: {
        _label: {
          fr: 'Choisis ton mot de passe',
          en: 'Choose your password',
        },
        placeholders: {
          _password: {
            fr: '8 caractères minimum',
            en: '8 characters minimum',
          },
          _confirmPassword: {
            fr: 'Confirme ton mot de passe',
            en: 'Confirm your password',
          },
        },
      },
      firstName: {
        _label: {
          fr: 'Entre ton prénom',
          en: 'Enter your first name',
        },
        _placeholder: {
          fr: 'Prénom(s) usuel(s)',
          en: 'Usual First Name(s)',
        },
        _hint: {
          fr: 'Exemple: <i>Madonna Louise</i>',
          en: 'Example: <i>Madonna Louise</i>',
        },
      },
      lastName: {
        _label: {
          fr: 'Entre ton nom',
          en: 'Enter your last name',
        },
        _placeholder: {
          fr: 'Nom de famille usuel',
          en: 'Usual first name',
        },
        _hint: {
          fr: 'Exemple: <i>Ciccone</i>',
          en: 'Example: <i>Ciccone</i>',
        },
      },
      artistName: {
        _label: {
          fr: "Ton nom d'artiste",
          en: 'Artist Name',
        },
        _placeholder: {
          fr: "Entre ton nom d'artiste",
          en: 'Artist label',
        },
        _hint: {
          fr:
            'Par exemple, <i>Madonna</i> est le nom d’artiste de <i>Madonna Louise Ciccone</i>.',
          en:
            'For example, <i>Madonna</i> is the artist label of <i>Madonna Louise Ciccone</i>.',
        },
      },
    },
    login: {
      email: {
        _label: {
          fr: 'Mon courriel',
          en: 'My email',
        },
        _placeholder: {
          fr: 'tonnom@exemple.com',
          en: 'name@example.com',
        },
      },
      password: {
        _label: {
          fr: 'Mon mot de passe',
          en: 'My password',
        },
        _hint: {
          fr: 'Mot de passe oublié?',
          en: 'Forgot password?',
        },
      },
    },
  },
  checkEmailModal: {
    _title: {
      fr: 'Vérifie tes courriels',
      en: 'Check your emails',
    },
    _content: {
      fr:
        'Un message incluant un lien de validation de ton compte t’a été envoyé par courriel. <br />Vérifie tes spams. On ne sait jamais !',
      en:
        'A message including a link to validate your account has been sent to you by email. <br />Check your spams. We never know !',
    },
    _button: {
      fr: "J'ai compris",
      en: 'Understood',
    },
  },
};
