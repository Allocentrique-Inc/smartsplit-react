import Dragger from './dragger/dragger';

const style = {
  collaboratorStyle: {
    backgroundColor: '#FAF8F9',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '2px',
  },
};

const Collaborator = (props) => (
  <div key={props.id} style={style.collaboratorStyle}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}
    >
      <div>
        {`${props.collaborator.firstName} ${props.collaborator.lastName}`}
      </div>
      <div>
        <button
          onClick={() => {
            props.deleteCollaborator(props.el.rightHolder);
          }}
        >
          ...
        </button>
      </div>
    </div>

    <select
      value={props.el.function}
      onChange={(e) => {
        const arr = [...props.recording];
        arr[props.id].function = e.target.value;
        props.setRecording(arr);
      }}
    >
      <option value="">Select Function</option>
      <option value="techProducer">techProducer</option>
    </select>

    <Dragger
      id={props.id}
      dividingMethod={props.dividingMethod}
      shares={props.el.shares}
      setShares={(newShares) => {
        // const arr = [...props.recording]
        // arr[id].shares = newShares
        // props.setRecording(arr)
        // props.handleDrag({ newShares, id: props.id })
      }}
      lock={props.el.lock}
      setLock={(newState) => {
        const arr = [...props.recording];
        arr[props.id].lock = newState;
        props.setRecording(arr);
      }}
    />
  </div>
);

export default Collaborator;
