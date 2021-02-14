import RoleBox from './roleBox/roleBox';
import Dragger from './dragger/dragger';

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
    <div className="roleRow">
      {['autor', 'adaptator'].map((role) => (
        <RoleBox
          key={role}
          copyright={props.copyright}
          role={role}
          id={props.id}
          deleteRole={props.deleteRole}
          addRole={props.addRole}
        />
      ))}
    </div>
    <div className="roleRow">
      {['composer', 'mixer'].map((role) => (
        <RoleBox
          key={role}
          copyright={props.copyright}
          role={role}
          id={props.id}
          deleteRole={props.deleteRole}
          addRole={props.addRole}
        />
      ))}
    </div>

    <Dragger
      id={props.id}
      copyrightDividingMethod={props.copyrightDividingMethod}
      shares={props.el.shares}
      setShares={(newShares) => {
        props.handleDrag({ newShares, id: props.id });
      }}
      lock={props.el.lock}
      setLock={(newState) => {
        const arr = [...props.copyright];
        arr[props.id].lock = newState;
        props.setCopyright(arr);
      }}
    />
  </div>
);

export default Collaborator;
