import Dragger from './dragger/dragger';

const Collaborator = (props) => (
  <div className="collaborator">
    <div className="b1">
      <div className="rowAC">
        <div className="avatar" />
        <div className="name">
          {`${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`}
        </div>
      </div>
      <div
        className="ellipsis"
        onClick={() => {
          props.deleteCollaborator(props.collaborator.rightHolder_id);
        }}
      >
        ...
      </div>
    </div>
    <div className="space" />

    <select
      className="selectStatus"
      value={props.collaborator.function}
      onChange={(e) => {
        const arr = [...props.recording];
        arr[props.id].function = e.target.value;
        props.setRecording(arr);
      }}
    >
      <option disabled value="">
        Select Function
      </option>
      <option value="producer">producer</option>
      <option value="autoProducer">autoProducer</option>
      <option value="directorProducer">directorProducer</option>
      <option value="techProducer">techProducer</option>
      <option value="studio">studio</option>
      <option value="illustratorDesigner">illustratorDesigner</option>
    </select>

    <Dragger
      activeCollaboratorsIds={props.activeCollaboratorsIds}
      rightHolder_id={props.collaborator.rightHolder_id}
      shares={props.collaborator.shares}
      setShares={(newShares) => {
        props.handleDrag({
          newShares,
          draggedRightHolder_id: props.collaborator.rightHolder_id,
        });
      }}
      lock={props.collaborator.lock}
      setLock={(newState) => {
        const arr = [...props.recording];
        arr[props.id].lock = newState;
        props.setRecording(arr);
      }}
    />
  </div>
);

export default Collaborator;
