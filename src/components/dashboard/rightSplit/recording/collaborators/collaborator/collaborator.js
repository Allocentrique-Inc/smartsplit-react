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
  <div className="collaborator">
    <div className="b1">
      <div className="rowAC">
        <div className="avatar" />
        <div className="name">
          {`${props.collaborator.firstName} ${props.collaborator.lastName}`}
        </div>
      </div>
      <div
        className="ellipsis"
        onClick={() => {
          props.deleteCollaborator(props.el.rightHolder);
        }}
      >
        ...
      </div>
    </div>
    <div className="space" />

    <select
      className="selectStatus"
      value={props.el.function}
      onChange={(e) => {
        const arr = [...props.recording];
        arr[props.id].function = e.target.value;
        props.setRecording(arr);
      }}
    >
      <option disabled value="">
        Select Function
      </option>
      <option value="principal">principal</option>
      <option value="featured">featured</option>
      <option value="bandMember">bandMember</option>
      <option value="session">session</option>
    </select>

    <Dragger
      id={props.id}
      shares={props.el.shares}
      setShares={(newShares) => {
        props.handleDrag({ newShares, id: props.id });
      }}
      lock={props.el.lock}
      setLock={(newState) => {
        const arr = [...props.copyright];
        arr[props.id].lock = newState;
        props.setRecording(arr);
      }}
    />
  </div>
);

export default Collaborator;
