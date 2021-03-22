import { useState } from 'react';
import getStatusOptions from './_getStatusOptions';
import ProfileOptions from '../_/profileOptions/profileOptions';

const Logistic = (props) => {
  const [query, setQuery] = useState('');

  const [status, setStatus] = useState([]);

  const handleSetQuery = (e) => setQuery(e.target.value);

  const t_search = {
    fr: 'Rechercher',
    en: 'Search',
  }[props.language];

  const statusOptions = getStatusOptions(props);
  const commonProps = { ...props };
  return (
    <div>
      <div style={{ marginLeft: 200 }}>
        <ProfileOptions {...commonProps} />
      </div>
      <div>Collaborators list logic</div>
      <div>
        <input
          value={query}
          onChange={handleSetQuery}
          onBlur={() => {}}
          placeholder={t_search}
        />
      </div>
      <div>
        {statusOptions.map((el, id) => {
          const handleToggleButton = () => {
            let newStatus;
            if (status.includes(el.value)) {
              newStatus = status.filter((EL) => EL !== el.value);
              setStatus();
            } else {
              newStatus = [...status, el.value];
              setStatus(newStatus);
            }
            setStatus(newStatus);
            // REFRESH TASKS
          };

          const backgroundColor = status.includes(el.value) ? 'red' : 'inherit';
          return (
            <button onClick={handleToggleButton} style={{ backgroundColor }}>
              {el.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Logistic;
