import { useState } from 'react';
import ChevronDown from '../../../../../icons/chevronDown';
import PlusCircleFull from '../../../../../icons/plusCircleFull';
import PlusCircle from '../../../../../icons/plusCircle';

const AddCollaborators = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const user_id = localStorage.getItem('user_id');
  const availablesCollaborators = props.collaborators.filter(
    (el) =>
      !props.preSelectedCollaborators.some(
        (EL) => EL.rightHolder_id === el.user_id,
      ),
  );
  return (
    <div
      className="addCollaborators"
      onClick={() => {
        setIsAdding((e) => !e);
      }}
    >
      <div className="addButton">
        <div className="plusIcon">
          <PlusCircleFull />
        </div>
        <div className="input">
          {props.isAddingLabel
            ? 'Ajouter un label'
            : 'Ajouter un collaborateur...'}
        </div>
        <div className="arrowDown">
          <ChevronDown />
        </div>
      </div>

      {isAdding && (
        <div id="dropDown">
          <div className="optionList">
            {availablesCollaborators.map((el, id) => {
              const isYou = el.user_id === user_id;
              const artistName = el.artistName || '';
              const firstName = el.firstName || '';
              const lastName = el.lastName || '';
              const firstInstance = artistName || `${firstName} ${lastName}`;
              const secondInstance = isYou
                ? '(toi)'
                : artistName
                  ? `(${firstName} ${lastName})`
                  : '';
              return (
                <div
                  className="option"
                  key={el.user_id}
                  onClick={async () => {
                    await props.addCollaborators(el);
                    await setIsAdding(false);
                  }}
                >
                  <div className="avatar">
                    {firstName[0]}
                    {lastName[0]}
                  </div>
                  <span className="firstInstance">{firstInstance}</span>
                  <span className="secondInstance">{secondInstance}</span>
                </div>
              );
            })}
          </div>
          <div
            className="addANew "
            onClick={() => {
              props.setIsCreatingNewCollaborator(true);
            }}
          >
            <div className="avatar">
              <PlusCircle />
            </div>
            Créer un nouveau collaborateur
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCollaborators;
