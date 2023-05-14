import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <div className="Navigation-Wrapper">
      <li>
        <NavLink className="links" id="Home" exact to="/">  L<i class="fa-regular fa-compass"></i>G BnB</NavLink>
      </li>
      {isLoaded && (
        <li id="Profile-Wrapper">
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
