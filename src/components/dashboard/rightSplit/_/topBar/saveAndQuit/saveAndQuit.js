import { useParams, useHistory } from 'react-router-dom';

const style = {
  saveAndQuit: {
    color: '#2DA84F',
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '24px',
    cursor: 'pointer',
  },
};

const SaveAndQuit = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  return (
    <div
      style={style.saveAndQuit}
      onClick={async () => {
        await props.saveRightSplit();
        history.push(`/workpiece/${workpiece_id}`);
      }}
    >
      SaveAndQuit
    </div>
  );
};

export default SaveAndQuit;
