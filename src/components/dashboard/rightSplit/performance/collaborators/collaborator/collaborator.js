import RoleBox from './roleBox/roleBox';
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      {['singer', 'musician'].map((role) => (
        <RoleBox
          key={role}
          performance={props.performance}
          role={role}
          id={props.id}
          deleteRole={props.deleteRole}
          addRole={props.addRole}
        />
      ))}
    </div>

    <select
      value={props.el.status}
      onChange={(e) => {
        const arr = [...props.performance];
        arr[props.id].status = e.target.value;
        props.setPerformance(arr);
      }}
    >
      <option value="">Select Status</option>
      <option value="principalArtist">principalArtist</option>
      <option value="invitedArtist">invitedArtist</option>
      <option value="bandMember">bandMember</option>
      <option value="artistAttendant">artistAttendant</option>
    </select>

    <Dragger
      id={props.id}
      dividingMethod={props.dividingMethod}
      shares={props.el.shares}
      setShares={(newShares) => {
        // const arr = [...props.performance]
        // arr[id].shares = newShares
        // props.setperformance(arr)
        // props.handleDrag({ newShares, id: props.id })
      }}
      lock={props.el.lock}
      setLock={(newState) => {
        const arr = [...props.performance];
        arr[props.id].lock = newState;
        props.setperformance(arr);
      }}
    />
  </div>
);

export default Collaborator;
