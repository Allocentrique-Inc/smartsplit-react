import { useState } from 'react';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';

const Collaborator = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  // AVATAR
  const avatarStyle = {
    backgroundColor:
      colors[
        props.activeCollaboratorsIds.indexOf(props.collaborator.rightHolder_id)
      ],
  };

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };
  const handleDeleteCollaboratorButton = () => {
    props.deleteCollaborator(props.collaborator.rightHolder_id);
  };

  // STATUS
  const setStatus = (e) => {
    const arr = [...props.recording];
    arr[props.id].function = e.target.value;
    props.setRecording(arr);
  };

  // DRAGGER
  const setShares = (newShares) => {
    props.handleDrag({
      newShares,
      draggedRightHolder_id: props.collaborator.rightHolder_id,
    });
  };
  const setLock = (newState) => {
    console.log(newState);
    const arr = [...props.recording];
    arr[props.id].lock = newState;
    props.setRecording(arr);
  };

  // TEXTS
  const t_initials = `${props.collaborator.rightHolder.firstName[0]}${props.collaborator.rightHolder.lastName[0]}`;
  const t_userName = `${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`;
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const get_t_recordingFunctionOptions = (value) =>
    props.translations.rightSplit.recordingFunctionOptions[`_${value}`][
      props.language
    ];

  const commonProps = {
    ...props,
    setLock,
    setShares,
    handleEllipsisClick,
    handleDeleteCollaboratorButton,
  };
  return (
    <div className="collaborator">
      <div className="b1">
        <div className="rowAC">
          {/* AVATAR */}
          <div className="avatar" style={avatarStyle}>
            {t_initials}
          </div>
          <div className="name">{t_userName}</div>
        </div>

        {/* ELLIPSIS OPTIONS */}
        <div className="ellipsis" onClick={handleEllipsisClick}>
          <Ellipsis />
          {isShowingOptions && (
            <button onClick={handleDeleteCollaboratorButton}>
              {t_removeCollaborator}
            </button>
          )}
        </div>
      </div>
      <div className="space" />

      {/* STATUS */}
      <select
        className="selectStatus"
        value={props.collaborator.function}
        onChange={setStatus}
      >
        {[
          'placeholder',
          'producer',
          'autoProducer',
          'directorProducer',
          'techProducer',
          'studio',
          'illustratorDesigner',
        ].map((el, id) => (
          <option disabled={id === 0} value={el}>
            {get_t_recordingFunctionOptions(el)}
          </option>
        ))}
      </select>

      {/* DRAGGER */}
      <Dragger {...commonProps} isDraggable />
    </div>
  );
};

export default Collaborator;
