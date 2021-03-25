import { useState } from 'react';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import setCollaboratorsErrors from '../_/setCollaboratorsErrors';
import Avatar from '../../../_/avatar/avatar';

const Collaborator = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);

  // AVATAR
  const collaboratorColor =
    colors[
      props.activeCollaboratorsIds.indexOf(props.collaborator.rightHolder_id)
    ];

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };
  const handleDeleteCollaboratorButton = () => {
    props.deleteCollaborator(props.collaborator.rightHolder_id);
  };

  // STATUS
  const setStatus = (e) => {
    let newRecording = [...props.recording];
    newRecording[props.id].function = e.target.value;
    newRecording = setCollaboratorsErrors(newRecording);
    props.setRecording(newRecording);
  };

  // DRAGGER
  const setShares = (newShares) => {
    props.handleDrag({
      newShares,
      draggedRightHolder_id: props.collaborator.rightHolder_id,
    });
  };
  const setLock = (newState) => {
    const arr = [...props.recording];
    arr[props.id].lock = newState;
    props.setRecording(arr);
  };

  const collaboratorClassName =
    props.collaborator &&
    props.collaborator.errors &&
    props.collaborator.errors.length > 0 &&
    props.triedSubmit
      ? 'collaborator collaboratorErrors'
      : 'collaborator';

  // TEXTS
  const t_initials = `${props.collaborator.rightHolder.firstName[0]}${props.collaborator.rightHolder.lastName[0]}`;
  const t_userName = `${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`;
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const get_t_recordingFunctionOptions = (value) => {
    if (value === '') value = 'placeholder';
    return props.translations.rightSplit.recordingFunctionOptions[`_${value}`][
      props.language
    ];
  };

  const commonProps = {
    ...props,
    setLock,
    setShares,
    handleEllipsisClick,
    handleDeleteCollaboratorButton,
  };
  return (
    <>
      <div className={collaboratorClassName}>
        <div className="b1">
          <div className="rowAC">
            {/* AVATAR */}
            <Avatar
              user={props.collaborator.rightHolder}
              color={collaboratorColor}
            />
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
            '',
            'producer',
            'selfProducer',
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
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Collaborator;
