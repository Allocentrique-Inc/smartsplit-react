import { useHistory } from 'react-router-dom';

const getAction = ({ hasStarted, hasToVote, workpiece_id, language }) => {
  const status = !hasStarted ? 'start' : !hasToVote ? 'continue' : 'vote';
  const t_start = {
    fr: 'Commencer',
    en: 'Start',
  }[language];
  const t_continue = {
    fr: 'Continuer',
    en: 'Continue',
  }[language];
  const t_vote = {
    fr: 'Voter',
    en: 'Vote',
  }[language];
  switch (status) {
    case 'start': {
      return {
        name: t_start,
        destination: `/workpiece/${workpiece_id}`,
      };
    }
    case 'continue': {
      return {
        name: t_continue,
        destination: `/workpiece/${workpiece_id}`,
      };
    }
    case 'vote': {
      return {
        name: t_vote,
        destination: `/workpiece/${workpiece_id}/right-split/vote`,
      };
    }
    default: {
      return {
        name: '',
        destination: `/workpiece/${workpiece_id}`,
      };
    }
  }
};

const Action = (props) => {
  const history = useHistory();
  const user_id = localStorage.getItem('user_id');
  const hasToVote =
    props.rightSplit &&
    props.rightSplit._state === 'voting' &&
    props.rightSplit.copyright &&
    props.rightSplit.performance &&
    props.rightSplit.recording
      ? [
        ...props.rightSplit.copyright,
        ...props.rightSplit.performance,
        ...props.rightSplit.recording,
      ]
        .filter((el) => el.rightHolder.user_id === user_id)
        .some((el) => el.vote === 'undecided')
      : false;

  const hasStarted = props.rightSplit;

  const { workpiece_id } = props;
  const { destination, name } = getAction({
    hasStarted,
    hasToVote,
    workpiece_id,
    language: props.language,
  });
  const handleButton = () => {
    props.setIsLoaded(false);
    history.push(destination);
  };

  return (
    <button className="action" onClick={handleButton}>
      {name}
    </button>
  );
};

export default Action;
