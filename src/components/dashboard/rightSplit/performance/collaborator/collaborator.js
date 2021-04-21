import { useState, useEffect } from 'react';
import RoleBox from '../../_/roleBox/roleBox';
import Dragger from '../../_/dragger/dragger';
import colors from '../../_/colors';
import Ellipsis from '../../../../../icons/ellipsis';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';
import setCollaboratorsErrors from '../_/setCollaboratorsErrors';
import Avatar from '../../../_/avatar/avatar';
import ArtistName from '../../../_/artistName/artistName';
import recalculateShares from '../_/recalculateShares';

const Collaborator = (props) => {
  const { collaborator, performance, setPerformance, dividingMethod } = props;
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  useEffect(() => {
    recalculateShares({
      performance,
      setPerformance,
      dividingMethod,
    });
  }, [collaborator.status]);
  // AVATAR
  const collaboratorColor =
    colors[
      props.activeCollaboratorIds.indexOf(props.collaborator.rightHolder_id)
    ];

  // ELLIPSIS
  const handleEllipsisClick = () => {
    setIsShowingOptions((e) => !e);
  };
  const handleDeleteCollaboratorButton = () => {
    props.deleteCollaborator(props.collaborator.rightHolder_id);
  };

  // STATUS
  const selectStatus = (e) => {
    let arr = [...props.performance];
    arr[props.id].status = e.target.value;
    arr = setCollaboratorsErrors(arr);
    setPerformance(arr);
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

  const collaboratorClassName =
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
  const t_singer =
    props.translations.rightSplit.performanceRoles._singer[props.language];
  const t_musician =
    props.translations.rightSplit.performanceRoles._musician[props.language];
  const t_principal =
    props.translations.rightSplit.performanceStatus._principal[props.language];
  const t_featured =
    props.translations.rightSplit.performanceStatus._featured[props.language];
  const t_bandMember =
    props.translations.rightSplit.performanceStatus._bandMember[props.language];
  const t_session =
    props.translations.rightSplit.performanceStatus._session[props.language];

  // COMMON PROPS
  const commonProps = {
    ...props,
    handleToggleRole,
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
          value={props.collaborator.status}
          onChange={selectStatus}
        >
          <option disabled value="">
            Select Status
          </option>
          <option value="principal">{t_principal}</option>
          <option value="featured">{t_featured}</option>
          <option value="bandMember">{t_bandMember}</option>
          <option value="session">{t_session}</option>
        </select>

        {/* ROLES */}
        <div className="roleRow">
          <RoleBox
            {...commonProps}
            arr={props.collaborator.roles}
            label={t_singer}
            _role="singer"
          />
          <RoleBox
            {...commonProps}
            arr={props.collaborator.roles}
            label={t_musician}
            _role="musician"
          />
        </div>

        {/* SHARES */}
        <Dragger {...commonProps} />
      </div>
      <CollaboratorErrors {...commonProps} />
    </>
  );
};

export default Collaborator;
