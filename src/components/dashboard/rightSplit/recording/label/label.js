import { useState, useEffect } from 'react';
import NotificationBox from './notificationBox/notificationBox';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';
import setLabelErrors from '../_/setLabelErrors';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import recalculateShares from '../_/recalculateShares';
import ArtistName from '../../../_/artistName/artistName';
import Slider from '../../../../_/form/slider/slider';
import Percentage from '../../../../_/form/percentage/percentage';
import Lock from '../../../../../icons/lock';
import Unlock from '../../../../../icons/unlock';
import checkLockedShareState from '../_/checkLockedShareState';

const Label = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const {
    label,
    recordingDividingMethod,
    recording,
    setRecording,
    setLabel,
    activeCollaborators,
    labelIsActive,
  } = props;
  useEffect(() => {
    recalculateShares({
      recordingDividingMethod,
      recording,
      label,
      setLabel,
      setRecording,
      activeCollaborators,
      labelIsActive,
    });
  }, [label.agreementDuration]);
  // AVATAR
  const avatarStyle = {
    backgroundColor:
      colors[props.activeCollaboratorIds.indexOf(label.rightHolder_id)],
  };

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };
  const isLocked = label.lock;
  const setLock = () => {
    label.lock = !isLocked;
    checkLockedShareState({
      recording,
      setRecording,
      label,
      setLabel,
      lockAll: !isLocked,
    });
  };

  const setShares = (newShares) => {
    props.handleDrag({
      newShares,
      draggedRightHolder_id: label.rightHolder_id,
    });
  };

  const handleNotifyViaEmail = () => {
    props.setLabel({
      ...props.label,
      notifViaEmail: !props.label.notifViaEmail,
    });
  };

  const handleNotifViaText = () => {
    props.setLabel({
      ...props.label,
      notifViaText: !props.label.notifViaText,
    });
  };

  const collaboratorClassName =
    label && label.errors && label.errors.length > 0 && props.triedSubmit
      ? 'collaborator collaboratorErrors'
      : 'collaborator';

  const collaboratorColor =
    colors[props.activeCollaboratorIds.indexOf(label.rightHolder_id)];
  const isDraggable =
    props.recordingDividingMethod === 'manual' &&
    !label.lock &&
    props.labelIsActive;

  const isYou = props.user.user_id === props.label.rightHolder.user_id;

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[props.language];
  const t_initials = `${label.rightHolder.firstName[0]}${label.rightHolder.lastName[0]}`;
  const t_userName = `${label.rightHolder.firstName} ${label.rightHolder.lastName}`;
  const t_notifViaEmail =
    props.translations.rightSplit.recordingLabelNotification._notifViaEmail[
      props.language
    ];
  const t_notifViaText =
    props.translations.rightSplit.recordingLabelNotification._notifViaText[
      props.language
    ];
  const t_notifyPresentation =
    props.translations.rightSplit.recordingLabelNotification
      ._notifyPresentation[props.language];

  const agreementDurationOptions = [
    'oneYear',
    'twoYears',
    'threeYears',
    'fourYears',
    'fiveYears',
    'renew',
  ];

  const get_t_recordingLabelDealTimeLapse = (value) =>
    props.translations.rightSplit.recordingLabelDealTimeLapse[`_${value}`][
      props.language
    ];

  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const commonProps = {
    ...props,
    setLock,
    setShares,
  };
  return (
    <>
      <div className={collaboratorClassName}>
        <div className="b1">
          <div className="rowAC">
            <div className="avatar" style={avatarStyle}>
              {t_initials}
            </div>
            <ArtistName user={props.label.rightHolder} className="name" />
            {isYou && t_you}
          </div>

          <div className="ellipsis" onClick={handleEllipsisClick}>
            <Ellipsis />
            {isShowingOptions && (
              <button onClick={props.deleteLabel}>
                {t_removeCollaborator}
              </button>
            )}
          </div>
        </div>
        <div className="space" />

        <select
          className="selectStatus"
          value={label.agreementDuration}
          onChange={(e) => props.setLabelAgreementDuration(e.target.value)}
        >
          <option disabled value="">
            Durée de l'entente
          </option>
          {agreementDurationOptions.map((el) => (
            <option key={el} value={el}>
              {get_t_recordingLabelDealTimeLapse(el)}
            </option>
          ))}
        </select>
        <div className="notifyPresentation">{t_notifyPresentation}</div>
        <div className="roleRow">
          <NotificationBox
            label={props.label}
            tag={t_notifViaEmail}
            value={props.label.notifViaEmail}
            toggle={handleNotifyViaEmail}
          />
          <NotificationBox
            label={props.label}
            tag={t_notifViaText}
            value={props.label.notifViaText}
            toggle={handleNotifViaText}
          />
        </div>

        <div className="shareRow">
          {props.recordingDividingMethod === 'manual' && props.labelIsActive && (
            <button
              className={`btn-icon ${label.lock ? 'locked' : 'unlocked'}`}
              onClick={setLock}
            >
              {label.lock ? <Lock /> : <Unlock />}
            </button>
          )}
          <Slider
            {...commonProps}
            color={collaboratorColor}
            value={label.shares}
            onChange={setShares}
            disabled={!isDraggable}
          />
          <Percentage
            value={label.shares}
            onChange={setShares}
            disabled={!isDraggable}
          />
        </div>
      </div>
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Label;
