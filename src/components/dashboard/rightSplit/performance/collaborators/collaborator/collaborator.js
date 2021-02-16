import RoleBox from './roleBox/roleBox';
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
          props.deleteCollaborator(props.el.rightHolder);
        }}
      >
        ...
      </div>
    </div>
    <div className="space" />

    <select
      className="selectStatus"
      value={props.collaborator.status}
      onChange={(e) => {
        const arr = [...props.performance];
        arr[props.id].status = e.target.value;
        props.setPerformance(arr);
      }}
    >
      <option disabled value="">
        Select Status
      </option>
      <option value="principal">principal</option>
      <option value="featured">featured</option>
      <option value="bandMember">bandMember</option>
      <option value="session">session</option>
    </select>

    <div className="roleRow">
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

    <Dragger
      activeCollaboratorsIds={props.activeCollaboratorsIds}
      rightHolder_id={props.collaborator.rightHolder_id}
      dividingMethod={props.dividingMethod}
      shares={props.collaborator.shares}
      setShares={() => {}}
      lock={props.collaborator.lock}
      setLock={(newState) => {
        const arr = [...props.performance];
        arr[props.id].lock = newState;
        props.setperformance(arr);
      }}
    />
  </div>
);

export default Collaborator;
