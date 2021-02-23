import { useState, useEffect } from 'react';
import AddProIdModal from './addProIdModal/addProIdModal';

export default function ProIdSelect({ value, onChange, onBlur }) {
  const [ids, setIds] = useState(value.ids);
  const [showModal, setShowModal] = useState(false);
  const handleIdChange = (name, newValue) => {
    const index = ids.findIndex((id) => id.name === name);
    ids[index].value = newValue;
    setIds([...ids]);
  };
  const handleOnAddId = (newId) => {
    ids.push({ name: newId, value: '' });
    onChange({ ids, public: value.public });
  };
  const togglePublicProperty = () => {
    onChange({ ids, public: !value.public });
  };
  useEffect(() => {
    value && setIds(value.ids);
  }, [value]);
  useEffect(() => {
    onBlur && onBlur();
  }, [value.ids, value.public]);
  return (
    <div className="proIdSelect toDo">
      <div className="inputs">
        {ids.map((id) => (
          <div className="formInput" key={id.name}>
            <label htmlFor={id.name}>{id.name}</label>
            <input
              type="text"
              value={id.value}
              onChange={(e) => handleIdChange(id.name, e.target.value)}
              onBlur={() => onChange({ ids, public: value.public })}
            />
          </div>
        ))}
      </div>
      {showModal && (
        <AddProIdModal setShowModal={setShowModal} onAdd={handleOnAddId} />
      )}
      <button className="btn-secondary" onClick={() => setShowModal(true)}>
        Ajouter un identifiant
      </button>
      <label>
        <input
          type="checkbox"
          value={value.public}
          checked={value.public}
          onChange={togglePublicProperty}
        />
        Rendre publics mes identifiants professionnels énumérés ci-dessus
      </label>
    </div>
  );
}
