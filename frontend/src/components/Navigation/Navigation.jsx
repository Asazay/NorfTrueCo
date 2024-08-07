import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import MenuButton from './MenuButton.jsx';
import SubMenuButton from "./SubMenuButton";
import { useNavigate } from 'react-router-dom';
// import * as sessionActions from '../../redux/session';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal/LoginFormModal'
import SignupFormModal from '../SignupFormModal/SignupFormModal'
import ShoppingCartModal from '../ShoppingCartModal/ShoppingCartModal.jsx';
import OpenModalNavItem from '../ShoppingCartModal/OpenModalNavItem.jsx';
import WishlistPage from '../WishlistPage/WishlistPage.jsx';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate()
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
      // <li>
      //   <OpenModalButton
      //     buttonText="Log In"
      //     modalComponent={<LoginFormModal />}
      //   />
      //   <OpenModalButton
      //     buttonText="Sign Up"
      //     modalComponent={<SignupFormModal />}
      //   />
      // </li>
      <li>
        <ProfileButton user={null} />
      </li>
    );
  }

  return (
    <div id='nav'>
      <div id='user-icons'>
        <div id='nav-icon'>
          <li><MenuButton/></li>
          {/* <button>
            <i className="fa-solid fa-bars" style={{ color: "#ffffff", fontSize: 24 }}></i>
          </button> */}
          <p>Menu</p>
        </div>
      </div>
      <div id='companyName'><button onClick={() => navigate('/')}><h2>Norf True Co.</h2></button>
      </div>
      <div id="user-icons">
        {
          <div id='nav-icon'>
            <button onClick={() => navigate('/wishlist')}>
              <i className="fa-solid fa-heart" style={{ color: "#ffffff", fontSize: 20 }}></i>
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
          <OpenModalNavItem
            iconEl={<i className="fa-solid fa-bag-shopping" style={{ color: "#f0f2f4", fontSize: 20 }}></i>}
            modalComponent={<ShoppingCartModal />}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;