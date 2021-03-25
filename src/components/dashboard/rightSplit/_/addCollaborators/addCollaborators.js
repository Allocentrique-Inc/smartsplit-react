import { useState, useEffect } from 'react';
import ChevronDown from '../../../../../icons/chevronDown';
import PlusCircleFull from '../../../../../icons/plusCircleFull';
import PlusCircle from '../../../../../icons/plusCircle';
import getUsersCollaborators from '../../../../../api/users/getUsersCollaborators';
import Avatar from '../../../_/avatar/avatar';

const AddCollaborators = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  const user_id = props.user.user_id;
  const [query, setQuery] = useState('');
  const [lastUpdate, setLastUpdate] = useState('0');
  const [isLoaded, setIsLoaded] = useState(false);
  const [availablesCollaborators, setAvailablesCollaborators] = useState([]);
  const filterCollaborators = (collaborators) => {
    return [props.user, ...collaborators].filter(
      (el) =>
        !props.preSelectedCollaborators.some(
          (EL) => EL.rightHolder_id === el.user_id,
        ),
    );
  };

  const refreshCollaborator = async (query) => {
    const time = new Date().getTime();
    const collaborators = await getUsersCollaborators({
      user_id,
      search_terms: query,
    });
    if (time > lastUpdate) {
      setLastUpdate(time);
      const availablesCollaborators = filterCollaborators(collaborators);
      setAvailablesCollaborators(availablesCollaborators);
    }
    setIsLoaded(true);
  };

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
    refreshCollaborator(e.target.value);
  };

  const handleOpenMenu = () => {
    setIsAdding((e) => !e);
    refreshCollaborator();
    document.getElementById('addCollaboratorInput').focus();
  };

  const handleCloseMenu = () => {
    setIsAdding(false);
    setQuery('');
    setIsLoaded(false);
  };

  const handleDelayCloseMenu = async () => {
    setTimeout(() => {
      handleCloseMenu();
    }, 500);
  };

  useEffect(() => {
    refreshCollaborator();
  }, []);

  return (
    <div
      className="addCollaborators"
      onClick={isAdding ? handleCloseMenu : handleOpenMenu}
    >
      <div className="addButton">
        <div className="plusIcon">
          <PlusCircleFull />
        </div>
        <input
          className="input"
          placeholder={
            props.isAddingLabel
              ? 'Ajouter un label'
              : 'Ajouter un collaborateur...'
          }
          value={query}
          onChange={handleQueryInput}
          id="addCollaboratorInput"
          onBlur={handleDelayCloseMenu}
          autoComplete="off"
        />
        <div className="arrowDown">
          <ChevronDown />
        </div>
      </div>

      {isLoaded && isAdding && (
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
                    setAvailablesCollaborators([]);
                    setQuery('');
                    await setIsAdding(false);
                  }}
                >
                  <Avatar user={el} />
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
