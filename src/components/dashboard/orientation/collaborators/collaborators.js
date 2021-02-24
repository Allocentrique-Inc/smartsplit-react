import X from '../../../../icons/x';

const Collaborators = (props) => {
  return (
    <div className="modalBackground" onClick={() => props.setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="topBar">
          <h4>Gérer les membres</h4>
          <button
            className="btn-icon"
            onClick={() => props.setShowModal(false)}
          >
            <X />
          </button>
        </div>
        <div className="content">
          <div>Add one</div>
          {props.workpiece.rightHolders.map((rightHolder, id) => {
            return (
              <RightHolder
                key={rightHolder.user_id}
                rightHolder={rightHolder}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RightHolder = (props) => {
  const { firstName, lastName } = props.rightHolder;
  const permission = 'read';
  const t_name = `${firstName} ${lastName}`;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
      }}
    >
      <div>{t_name}</div>
      <div>{permission}</div>
    </div>
  );
};

export default Collaborators;
