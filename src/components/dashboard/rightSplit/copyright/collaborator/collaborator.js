import { useState } from 'react';
import RoleBox from '../../_/roleBox/roleBox';
import colors from '../../_/colors';
import Ellipsis from '../../../../../icons/ellipsis';
import Dragger from '../../_/dragger/dragger';

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

  // ROLE BOX
  const handleToggleRole = (role) => {
    const isPresent = props.collaborator.roles.some((el) => role === el);
    console.log(role, isPresent);
    if (isPresent) {
      props.deleteRole(role, props.collaborator.rightHolder_id);
    } else {
      props.addRole(role, props.collaborator.rightHolder_id);
    }
  };

  // DRAGGER
  const setShares = (newShares) =>
    props.handleDrag({ newShares, id: props.id });
  const setLock = (newState) => {
    const arr = [...props.copyright];
    arr[props.id].lock = newState;
    props.setCopyright(arr);
  };
  const isDraggable = props.copyrightDividingMethod === 'manual';

  // TEXTS
  const t_initials = `${props.collaborator.rightHolder.firstName[0]}${props.collaborator.rightHolder.lastName[0]}`;
  const t_userName = `${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`;
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];
  const t_autor =
    props.translations.rightSplit.copyrightRoles._autor[props.language];
  const t_composer =
    props.translations.rightSplit.copyrightRoles._composer[props.language];
  const t_adaptator =
    props.translations.rightSplit.copyrightRoles._adaptator[props.language];
  const t_mixer =
    props.translations.rightSplit.copyrightRoles._mixer[props.language];

  // COMMON PROPS
  const commonProps = {
    ...props,
    isDraggable,
    setLock,
    setShares,
    handleToggleRole,
  };
  return (
    <div className="collaborator">
      <div className="b1">
        {/* AVATAR */}
        <div className="rowAC">
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

      {/* ROLES */}
      <div className="roleRow">
        <RoleBox
          {...commonProps}
          arr={props.collaborator.roles}
          label={t_autor}
          _role="autor"
        />
        <RoleBox
          {...commonProps}
          arr={props.collaborator.roles}
          label={t_composer}
          _role="composer"
        />
      </div>
      <div className="roleRow">
        <RoleBox
          {...commonProps}
          arr={props.collaborator.roles}
          label={t_adaptator}
          _role="adaptator"
        />
        <RoleBox
          {...commonProps}
          arr={props.collaborator.roles}
          label={t_mixer}
          _role="mixer"
        />
      </div>

      {/* SHARES */}
      <Dragger {...commonProps} />
    </div>
  );
};

export default Collaborator;
