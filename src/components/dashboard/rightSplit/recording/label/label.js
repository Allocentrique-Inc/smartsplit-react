import { useState } from 'react';
import NotificationBox from './notificationBox/notificationBox';
import Dragger from '../../_/dragger/dragger';
import Ellipsis from '../../../../../icons/ellipsis';
import colors from '../../_/colors';

const Collaborator = (props) => {
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  let collaborator =
    typeof props.el.rightHolder === 'string'
      ? props.collaborators.find((EL) => EL.user_id === props.el.rightHolder)
      : props.el.rightHolder;
  collaborator = {
    ...collaborator,
    ...props.el,
  };

  // AVATAR
  const avatarStyle = {
    backgroundColor:
      colors[props.activeCollaboratorsIds.indexOf(collaborator.rightHolder_id)],
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
      draggedRightHolder_id: collaborator.user_id,
    });
  };

  // TEXTS
  const t_initials = `${collaborator.rightHolder.firstName[0]}${collaborator.rightHolder.lastName[0]}`;
  const t_userName = `${collaborator.rightHolder.firstName} ${collaborator.rightHolder.lastName}`;
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
    collaborator,
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
            <button onClick={props.deleteCollaborator}>
              {t_removeCollaborator}
            </button>
          )}
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
        {[
          'oneYear',
          'twoYears',
          'threeYears',
          'fourYears',
          'fiveYears',
          'renew',
        ].map((el) => (
          <option value={el}>{get_t_recordingLabelDealTimeLapse(el)}</option>
        ))}
      </select>
      <div className="notifyPresentation">{t_notifyPresentation}</div>
      <div className="roleRow">
        <NotificationBox
          label={props.label}
          tag={t_notifViaEmail}
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
          tag={t_notifViaText}
          value={props.label.notifViaText}
          toggle={() => {
            props.setLabel({
              ...props.label,
              notifViaText: !props.label.notifViaText,
            });
          }}
        />
      </div>

      <Dragger {...commonProps} isDraggable />
    </div>
  );
};

export default Collaborator;
