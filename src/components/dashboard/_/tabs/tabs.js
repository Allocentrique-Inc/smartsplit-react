import { useState } from 'react';

const Tabs = ({ options, children }) => {
  const [currentTab, setCurrentTab] = useState(options[0]);
  const currentIndex = options.indexOf(currentTab);
  const isSelected = (option) => option === currentTab;
  return (
    <div className="tabs">
      <div className="tabMenu">
        {options.map((option) => (
          <div
            className={`menuItem${isSelected(option) ? ' selected' : ''}`}
            key={option}
            onClick={() => setCurrentTab(option)}
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
