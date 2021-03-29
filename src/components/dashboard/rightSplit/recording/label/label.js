import { useState, useEffect } from 'react';
import NotificationBox from './notificationBox/notificationBox';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';
import setLabelErrors from '../_/setLabelErrors';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import recalculateShares from '../_/recalculateShares';
import Avatar from '../../../_/avatar/avatar';
import ArtistName from '../../../_/artistName/artistName';

const Label = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const {
    label,
    recordingDividingMethod,
    recording,
    setRecording,
    setLabel,
    activeCollaborators,
    isLabelActive,
  } = props;
  useEffect(
    () =>
      recalculateShares({
        recordingDividingMethod,
        recording,
        label,
        setLabel,
        setRecording,
        activeCollaborators,
        isLabelActive,
      }),
    [label.agreementDuration],
  );
  // AVATAR
  const avatarStyle = {
    backgroundColor:
      colors[props.activeCollaboratorsIds.indexOf(label.rightHolder_id)],
  };

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };

  const setLock = (newState) => {
    props.setLabel({ ...props.label, lock: newState });
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

  // TEXTS
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
            <Avatar
              user={props.collaborator.rightHolder}
            />
            <div className="name"><ArtistName user={props.collaborator.rightHolder} /></div>
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

        <Dragger {...commonProps} collaborator={label} isDraggable />
      </div>
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Label;
