import * as React from 'react';
import { useState } from 'react';
import MusicIcon from '../../../../icons/music';
import Avatar from '../../_/avatar/avatar';
import BellIcon from '../../../../icons/bell';
import UsersIcon from '../../../../icons/users';

const MobileNav = (props) => {
  const { user } = props;
  const [selected, setSelected] = useState('workpieces');
  const sections = [{
    name: 'workpieces',
    icon: MusicIcon,
  }, {
    name: 'notifications',
    icon: BellIcon,
  }, {
    name: 'collaborators',
    icon: UsersIcon,
  }, {
    name: 'settings',
    icon: Avatar,
  },
  ];
  return (
    <div className="mobile-nav">
      {sections.map((section) => (
        <button
          className="btn-icon"
          onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected(section.name);
                }}
        >{React.createElement(
          section.icon,
          { color: selected === section.name ? '#2DA84F' : '#ccc', className: 'tiny', ...props })
        }
        </button>
      ))
      }
    </div>
  );
};
export default MobileNav;
