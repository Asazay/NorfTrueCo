import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import ProfileButton from './ProfileButton';
// import * as sessionActions from '../../redux/session';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal/SignupFormModal'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const dispatch = useDispatch();

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.thunkLogout());
  // };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div id='nav'>
      <div id='user-icons'>
        <div id='nav-icon'>
          <button>
            <i class="fa-solid fa-bars" style={{ color: "#ffffff", fontSize: 24 }}></i>
          </button>
          <p>Menu</p>
        </div>
      </div>
      <div id='companyName'><h2>Norf True Co.</h2></div>
      <div id="user-icons">
        {sessionUser && 
        <div id='nav-icon'>
          <button>
            <i class="fa-solid fa-heart" style={{ color: "#ffffff", fontSize: 20 }}></i>
          </button>
        </div>
        }
        <div id='nav-icon'>
          {/* <li>
              <NavLink to="/">Home</NavLink>
            </li> */}
          {isLoaded && sessionLinks}
        </div>
        <div id='nav-icon'>
          <button><i class="fa-solid fa-bag-shopping" style={{ color: "#f0f2f4", fontSize: 20 }}></i></button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;