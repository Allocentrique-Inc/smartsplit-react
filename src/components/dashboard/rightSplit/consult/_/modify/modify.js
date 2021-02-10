import { useHistory, useParams } from 'react-router-dom';

const Modify = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  return (
    <div>
      {props.modifiable && (
        <button
          onClick={() => {
            history.push(
              `/workpiece/${workpiece_id}/right-split/${props.destination}`,
            );
          }}
        >
          Modifier
        </button>
      )}
    </div>
  );
};

export default Modify;
