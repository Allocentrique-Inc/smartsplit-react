import { useState, useEffect } from 'react';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import setCollaboratorsErrors from '../_/setCollaboratorsErrors';
import Avatar from '../../../_/avatar/avatar';
import recalculateShares from '../_/recalculateShares';
import ArtistName from '../../../_/artistName/artistName';

const Collaborator = (props) => {
  const {
    collaborator,
    activeCollaborators,
    isLabelActive,
    recordingDividingMethod,
    recording,
    label,
    setRecording,
    setLabel,
  } = props;
  useEffect(
    () =>
      recalculateShares({
        activeCollaborators,
        isLabelActive,
        recordingDividingMethod,
        recording,
        label,
        setLabel,
        setRecording,
      }),
    [collaborator.function],
  );
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

  const isYou = props.user.user_id === props.collaborator.rightHolder.user_id;

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[props.language];
  const t_userName = `${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`;
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const get_t_recordingFunctionOptions = (value) => {
    if (value === '') value = 'placeholder';
    return props.translations.rightSplit.recordingFunctionOptions[`_${value}`][
      props.language
    ];
  };

  const isDraggable = props.recordingDividingMethod === 'manual';

  const commonProps = {
    ...props,
    isDraggable,
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
            <ArtistName
              user={props.collaborator.rightHolder}
              className="name"
            />
            {isYou && t_you}
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
          onChange={(e) =>
            props.setCollaboratorFunction(
              e.target.value,
              props.collaborator.rightHolder_id,
            )
          }
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
            <option disabled={id === 0} value={el} key={el}>
              {get_t_recordingFunctionOptions(el)}
            </option>
          ))}
        </select>

        {/* DRAGGER */}
        <Dragger {...commonProps} />
      </div>
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Collaborator;
