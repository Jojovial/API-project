import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if(sessionUser) {
      setFirstName(sessionUser.firstName);
    }
  }, [sessionUser]);



  return (
    <ul>
      <div className="Navigation-Wrapper">
      <li>
        <NavLink className="links" id="Home" exact to="/">  L<i class="fa-regular fa-compass"></i>G BnB</NavLink>
      </li>
      {isLoaded && (
        <li id="Profile-Wrapper">
          <ProfileButton user={sessionUser} firstName={firstName} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;
