import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavItem({menu}:INavItem) {
  return (
    <NavLink
      className='nav-link animate__animated animate__fadeIn d-flex'
      to={menu.path}
    >
      <span className='icon'>
        <i className={menu.icon}></i>
      </span>
      {menu.display}
    </NavLink>
  );
}

export interface INavItem{
  menu:any
}
