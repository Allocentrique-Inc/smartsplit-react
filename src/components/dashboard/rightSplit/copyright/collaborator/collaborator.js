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

  const collaboratorClassName =
    props.collaborator.errors.length > 0
      ? 'collaborator collaboratorErrors'
      : 'collaborator';

  // COMMON PROPS
  const commonProps = {
    ...props,
    isDraggable,
    setLock,
    setShares,
    handleToggleRole,
  };
  return (
    <>
      <div className={collaboratorClassName}>
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
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

const CollaboratorErrors = (props) => (
  <div className="collaboratorTextErrors">
    {props.collaborator.errors.map((el, id) => (
      <div style={{ marginRight: '8px' }} key={el}>
        {el}
      </div>
    ))}
  </div>
);

export default Collaborator;
