import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Tabs = ({ options, children, optionActions = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSelected = (index) => index === currentIndex;
  return (
    <div className="tabs">
      <div className="tabMenu">
        {options.map((option, index) => (
          <div
            className={`menuItem${isSelected(index) ? ' selected' : ''}`}
            key={option}
            onClick={() => {
              let updateComponent = true;
              if (optionActions[index]) {
                updateComponent = optionActions[index]();
              }
              updateComponent && setCurrentIndex(index);
            }}
          >
            {option}
          </div>
        ))}
      </div>
      {Array.isArray(children) && children[currentIndex]}
      {!Array.isArray(children) && children}
    </div>
  );
};

export default Tabs;

export function Tab({ children, ...nextProps }) {
  return (
    <div className="tab" {...nextProps}>
      {children}
    </div>
  );
}
