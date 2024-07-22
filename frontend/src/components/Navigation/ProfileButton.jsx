import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../redux/session';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { useNavigate } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.thunkLogout());
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fa-solid fa-user" style={{ color: "#ffffff", fontSize: 20 }}></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="user-info">
            <div><p style={{padding: 10}}>{user && user.firstName && 'Hello, ' +  user.firstName.toUpperCase()}</p></div>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <div id="menu-clickable"><li><button onClick={e => {e.preventDefault(); navigate('/orders'); closeMenu()}}>My Orders</button></li></div>
            <div id="menu-clickable"><li><button onClick={e => {e.preventDefault(); navigate('/wishlist'); closeMenu()}}>My Wishlist</button></li></div>
            <div id="menu-clickable">
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </div>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              className={'login-signup'}
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className={'login-signup'}
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;