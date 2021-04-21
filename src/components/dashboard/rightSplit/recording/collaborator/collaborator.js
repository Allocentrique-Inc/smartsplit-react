import { useState, useEffect } from 'react';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import setCollaboratorsErrors from '../_/setCollaboratorsErrors';
import Avatar from '../../../_/avatar/avatar';
import recalculateShares from '../_/recalculateShares';
import ArtistName from '../../../_/artistName/artistName';
import checkLockedShareState from '../_/checkLockedShareState';
import Lock from '../../../../../icons/lock';
import Unlock from '../../../../../icons/unlock';
import Slider from '../../../../_/form/slider/slider';
import Percentage from '../../../../_/form/percentage/percentage';

const Collaborator = (props) => {
  const {
    collaborator,
    activeCollaborators,
    labelIsActive,
    recordingDividingMethod,
    recording,
    label,
    setRecording,
    setLabel,
  } = props;
  useEffect(() => {
    recalculateShares({
      activeCollaborators,
      labelIsActive,
      recordingDividingMethod,
      recording,
      label,
      setLabel,
      setRecording,
    });
  }, [collaborator.function]);

  const [isShowingOptions, setIsShowingOptions] = useState(false);

  // AVATAR
  const collaboratorColor =
    colors[props.activeCollaboratorIds.indexOf(collaborator.rightHolder_id)];

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };
  const handleDeleteCollaboratorButton = () => {
    props.deleteCollaborator(collaborator.rightHolder_id);
  };

  // DRAGGER
  const setShares = (newShares) => {
    props.handleDrag({
      newShares,
      draggedRightHolder_id: collaborator.rightHolder_id,
    });
  };
  const isLocked = collaborator.lock;
  const setLock = (newState) => {
    collaborator.lock = !isLocked;
    checkLockedShareState({
      recording,
      setRecording,
      label,
      setLabel,
      lockAll: !isLocked,
    });
  };

  const collaboratorClassName =
    collaborator &&
    collaborator.errors &&
    collaborator.errors.length > 0 &&
    props.triedSubmit
      ? 'collaborator collaboratorErrors'
      : 'collaborator';

  const isYou = props.user.user_id === collaborator.rightHolder.user_id;

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[props.language];
  const t_userName = `${collaborator.rightHolder.firstName} ${collaborator.rightHolder.lastName}`;
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const get_t_recordingFunctionOptions = (value) => {
    if (value === '') value = 'placeholder';
    return props.translations.rightSplit.recordingFunctionOptions[`_${value}`][
      props.language
    ];
  };

  const isActive = collaborator.function !== '';
  const isDraggable =
    props.recordingDividingMethod === 'manual' &&
    !props.recording[props.id].lock &&
    isActive;

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
            <Avatar user={collaborator.rightHolder} color={collaboratorColor} />
            <ArtistName user={collaborator.rightHolder} className="name" />
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
          value={collaborator.function}
          onChange={(e) =>
            props.setCollaboratorFunction(
              e.target.value,
              collaborator.rightHolder_id,
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

        <div className="shareRow">
          {props.recordingDividingMethod === 'manual' && isActive && (
            <button
              className={`btn-icon ${
                collaborator.lock ? 'locked' : 'unlocked'
              }`}
              onClick={setLock}
            >
              {collaborator.lock ? <Lock /> : <Unlock />}
            </button>
          )}
          <Slider
            {...commonProps}
            color={collaboratorColor}
            value={collaborator.shares}
            onChange={setShares}
            disabled={!isDraggable}
          />
          <Percentage
            value={collaborator.shares}
            onChange={setShares}
            disabled={!isDraggable}
          />
        </div>
      </div>
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Collaborator;
