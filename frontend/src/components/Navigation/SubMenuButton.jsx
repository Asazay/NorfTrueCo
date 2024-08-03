import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function SubMenuButton({ menuOptName, theUlClassName, subMenuOptsArray, subMenuOptsLinks, closeMenu }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

    // const closeMenu = () => setShowMenu(false);

    const ulClassName = 'submenu-dropdown-' + theUlClassName + (showMenu ? "" : " hidden");

    return (
        <div id="nav-menu-btn">
            <div id="button-submenu">
                <div style={{width: '80%'}}>
                    <button id='subMenuBtn' onClick={e => { e.preventDefault(); navigate(`/shop/products/query/?gender=${menuOptName.toLowerCase()}`); closeMenu() }}>
                        {menuOptName ? menuOptName : "NULL"}
                    </button>
                </div>
                <div style={{width: '20%'}}><button className='arrow-symbol' onClick={toggleMenu}><i className="fa-solid fa-greater-than"></i></button></div>
            </div>
            <ul className={ulClassName} ref={ulRef}>
                <div id="nav-menu">
                    {(subMenuOptsArray.length && subMenuOptsLinks.length) && subMenuOptsArray.length === subMenuOptsLinks.length
                        && subMenuOptsArray.map((subMenuOpt, i) => {
                            return (
                                <div key={'subMenuDiv' + i} id="menu-clickable"><li><button onClick={e => { e.preventDefault(); navigate(subMenuOptsLinks[i]); setShowMenu(false); closeMenu() }}>{subMenuOpt}</button></li></div>
                            )
                        })
                    }
                    {/* <div id="menu-clickable"><li><button onClick={e => { e.preventDefault(); navigate('/'); closeMenu() }}>Home</button></li></div>
                    <div id="menu-clickable"><li><button onClick={e => { e.preventDefault(); navigate('/wishlist'); closeMenu() }}>My Wishlist</button></li></div> */}
                </div>
            </ul>
        </div>
    );
}

export default SubMenuButton;