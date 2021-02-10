import RoleBox from "./roleBox/roleBox";
import Dragger from "./dragger/dragger";

const Collaborator = (props) => {
  return (
    <div key={props.id} style={style.collaboratorStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div>
          {props.collaborator.firstName + " " + props.collaborator.lastName}
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
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        {["autor", "adaptator"].map((role) => (
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {["composer", "mixer"].map((role) => (
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
        dividingMethod={props.dividingMethod}
        shares={props.el.shares}
        setShares={(newShares) => {
          // const arr = [...props.copyright]
          // arr[id].shares = newShares
          // props.setCopyright(arr)
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
};

export default Collaborator;

const style = {
  collaboratorStyle: {
    backgroundColor: "#FAF8F9",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "2px",
  },
};
