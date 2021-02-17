import { useState } from 'react';
import RoleBox from './roleBox/roleBox';
import Dragger from './dragger/dragger';
import colors from '../../_/colors';
import Ellipsis from '../../../../../icons/ellipsis';

const Collaborator = (props) => {
  console.log('ASD');
  const [isShowingOptions, setIsShowingOptions] = useState(false);
  const t_removeCollaborator =
    props.translations.rightSplit._removeCollaborator[props.language];

  return (
    <div className="collaborator">
      <div className="b1">
        <div className="rowAC">
          <div
            className="avatar"
            style={{
              backgroundColor:
                colors[
                  props.activeCollaboratorsIds.indexOf(
                    props.collaborator.rightHolder_id,
                  )
                ],
            }}
          >
            {`${props.collaborator.rightHolder.firstName[0]}${props.collaborator.rightHolder.lastName[0]}`}
          </div>
          <div className="name">
            {`${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`}
          </div>
        </div>
        <div
          className="ellipsis"
          onClick={() => {
            setIsShowingOptions((e) => !e);
          }}
        >
          <Ellipsis />
          {isShowingOptions && (
            <button
              onClick={() => {
                props.deleteCollaborator(props.collaborator.rightHolder_id);
              }}
            >
              {t_removeCollaborator}
            </button>
          )}
        </div>
      </div>
      <div className="space" />
      <div className="roleRow">
        {['autor', 'adaptator'].map((role) => (
          <RoleBox
            key={role}
            {...props}
            copyright={props.copyright}
            role={role}
            collaborator={props.collaborator}
            deleteRole={props.deleteRole}
            addRole={props.addRole}
          />
        ))}
      </div>
      <div className="roleRow">
        {['composer', 'mixer'].map((role) => (
          <RoleBox
            key={role}
            {...props}
            copyright={props.copyright}
            role={role}
            collaborator={props.collaborator}
            deleteRole={props.deleteRole}
            addRole={props.addRole}
          />
        ))}
      </div>

      <Dragger
        activeCollaboratorsIds={props.activeCollaboratorsIds}
        rightHolder_id={props.collaborator.rightHolder_id}
        copyrightDividingMethod={props.copyrightDividingMethod}
        shares={props.collaborator.shares}
        setShares={(newShares) => {
          props.handleDrag({ newShares, id: props.id });
        }}
        lock={props.collaborator.lock}
        setLock={(newState) => {
          const arr = [...props.copyright];
          arr[props.id].lock = newState;
          props.setCopyright(arr);
        }}
      />
    </div>
  );
};

export default Collaborator;
