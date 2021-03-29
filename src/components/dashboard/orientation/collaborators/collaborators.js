import X from '../../../../icons/x';
import ArtistName from '../../_/artistName/artistName';

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
  const permission = 'read';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
      }}
    >
      <ArtistName user={props.rightHolder} />
      <div>{permission}</div>
    </div>
  );
};

export default Collaborators;
