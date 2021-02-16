import Dragger from './dragger/dragger';
import NotificationBox from './notificationBox/notificationBox';

const Collaborator = (props) => {
  let collaborator = typeof props.el.rightHolder === 'string'
    ? props.collaborators.find((EL) => EL.user_id === props.el.rightHolder)
    : props.el.rightHolder;
  collaborator = {
    ...collaborator,
    ...props.el,
  };
  return (
    <div className="collaborator">
      <div className="b1">
        <div className="rowAC">
          <div className="avatar" />
          <div className="name">
            {`${collaborator.firstName} ${collaborator.lastName}`}
          </div>
        </div>
        <div
          className="ellipsis"
          onClick={() => {
            props.deleteCollaborator();
          }}
        >
          ...
        </div>
      </div>
      <div className="space" />

      <select
        className="selectStatus"
        value={props.el.agreementDuration}
        onChange={(e) => {
          const label = { ...props.label };
          label.agreementDuration = e.target.value;
          props.setLabel(label);
        }}
      >
        <option disabled value="">
          Durée de l'entente
        </option>
        <option value="1">1 an</option>
        <option value="2">2 ans</option>
        <option value="3">3 ans</option>
        <option value="4">4 ans</option>
        <option value="5">5 ans</option>
      </select>

      <div className="roleRow">
        <NotificationBox
          label={props.label}
          tag="notifViaEmail"
          value={props.label.notifViaEmail}
          toggle={() => {
            props.setLabel({
              ...props.label,
              notifViaEmail: !props.label.notifViaEmail,
            });
          }}
        />
        <NotificationBox
          label={props.label}
          tag="notifViaText"
          value={props.label.notifViaText}
          toggle={() => {
            props.setLabel({
              ...props.label,
              notifViaText: !props.label.notifViaText,
            });
          }}
        />
      </div>
      <Dragger
        activeCollaboratorsIds={props.activeCollaboratorsIds}
        rightHolder_id={props.label.rightHolder_id}
        shares={collaborator.shares}
        setShares={(newShares) => {
          props.handleDrag({
            newShares,
            draggedRightHolder_id: collaborator.user_id,
          });
        }}
        lock={collaborator.lock}
        setLock={(newState) => {
          props.setLabel({ ...props.label, lock: newState });
        }}
      />
    </div>
  );
};

export default Collaborator;
