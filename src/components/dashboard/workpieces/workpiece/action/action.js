import { useHistory } from 'react-router-dom';

const getAction = ({ hasStarted, hasToVote, workpiece_id }) => {
  const status = !hasStarted ? 'start' : !hasToVote ? 'continue' : 'vote';
  switch (status) {
    case 'start': {
      return {
        name: 'Commencer',
        destination: `/workpiece/${workpiece_id}`,
      };
    }
    case 'continue': {
      return {
        name: 'Continuer',
        destination: `/workpiece/${workpiece_id}`,
      };
    }
    case 'vote': {
      return {
        name: 'Voter',
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
  const hasToVote = props.rightSplit
    && props.rightSplit._state === 'voting'
    && props.rightSplit.copyright
    && props.rightSplit.performance
    && props.rightSplit.recording
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
  });
  const handleButton = () => history.push(destination);

  return (
    <button className="action" onClick={handleButton}>
      {name}
    </button>
  );
};

export default Action;
