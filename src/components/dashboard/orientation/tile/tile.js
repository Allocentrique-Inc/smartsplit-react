import { useHistory } from 'react-router-dom';
import RightSplit from './icons/rightsplit';
import Monetize from './icons/monetize';
import Protection from './icons/protection';

const getIcon = (tileId, language) => {
  switch (tileId) {
    case 'share':
      return <RightSplit />;
    case 'monetize':
      return <Monetize />;
    case 'protect':
      return <Protection />;
    default:
      return '---';
  }
};

const getTitle = (tileId, language) => {
  switch (language) {
    case 'fr': {
      switch (tileId) {
        case 'share':
          return 'Partage tes droits';
        case 'document':
          return 'Documente ton oeuvre';
        case 'protect':
          return 'Protège ton oeuvre';
        case 'monetize':
          return 'Monétise ton oeuvre';
        default:
          return '---';
      }
    }
    case 'en': {
      switch (tileId) {
        case 'share':
          return 'Split your rights';
        case 'document':
          return 'Document your workpiece';
        case 'protect':
          return 'Protect your workpiece';
        case 'monetize':
          return 'Monetize your workpiece';
        default:
          return '---';
      }
    }
    default:
      return '---';
  }
};
const getDescription = (tileId, language) => {
  switch (language) {
    case 'fr': {
      switch (tileId) {
        case 'share':
          return "Crée les partages sur les droits à l'aide de notre guide.  Tu vas voir, c'est beaucoup plus simple que tu ne le crois :)";
        case 'document':
          return 'Rends totalement découvrable ton oeuvre aux yeux des moteurs de recherche pour augmenter ton auditoire.';
        case 'protect':
          return 'Associe dès aujourd’hui ton enregistrement sonore à ses ayant droits et laisse des traces indélébiles de ça sur une blockchain.';
        case 'monetize':
          return 'Déclare en un seul clic tes partages de droits à TOUTES les sociétés de gestions.';
        default:
          return '---';
      }
    }
    case 'en': {
      switch (tileId) {
        case 'share':
          return "Create the splits on your rights with our guide.  You'll see, it's easier than you think :)";
        case 'document':
          return '---';
        case 'protect':
          return '---';
        case 'monetize':
          return '---';
        default:
          return '---';
      }
    }
    default:
      return '---';
  }
};
const getActionNameAndDestination = (props) => {
  const t_start = {
    fr: 'Commencer',
    en: 'Start',
  }[props.language];
  const t_continue = {
    fr: 'Continuer',
    en: 'Continue',
  }[props.language];
  const t_consult = {
    fr: 'Consulter',
    en: 'Consult',
  }[props.language];

  switch (props.tileId) {
    case 'share': {
      const _state =
        props.workpiece &&
        props.workpiece.rightSplit &&
        props.workpiece.rightSplit._state;
      switch (_state) {
        case undefined:
          return {
            name: t_start,
            destination: `/workpiece/${props.workpiece_id}/right-split/copyright`,
            className: 'action start',
          };
        case 'draft':
          return {
            name: t_continue,
            destination: `/workpiece/${props.workpiece_id}/right-split/summary`,
            className: 'action',
          };
        default:
          return {
            name: t_consult,
            destination: `/workpiece/${props.workpiece_id}/right-split/summary`,
            className: 'action',
          };
      }
    }
    case 'document': {
      return {
        name: 'Commencer',
        destination: `/workpiece/${props.workpiece_id}/documentation`,
        className: 'action start',
      };
    }
    case 'protect': {
      const _state = undefined;
      if (_state === undefined) {
        return {
          name: 'Commencer',
          destination: `/workpiece/${props.workpiece_id}/protect/file`,
          className: 'action start',
        };
      }
      break;
    }
    case 'monetize': {
      return {
        name: 'Commencer',
        destination: `/workpiece/${props.workpiece_id}/monetize`,
        className: 'action start',
      };
    }
    default:
      return {
        name: '---',
        destination: '',
        className: 'action start',
      };
  }
};

const Tile = (props) => {
  const history = useHistory();
  const action = getActionNameAndDestination(props);
  return (
    <div className="tile">
      <div className="image">{getIcon(props.tileId)}</div>
      <div>
        <div className="title"> {getTitle(props.tileId, props.language)} </div>
        <div className="description">
          {getDescription(props.tileId, props.language)}{' '}
        </div>
      </div>
      <button
        className={action.className}
        onClick={() => {
          history.push(action.destination);
        }}
      >
        {action.name}
      </button>
    </div>
  );
};

export default Tile;
