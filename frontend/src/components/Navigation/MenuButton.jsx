import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SubMenuButton from "./SubMenuButton";

function MenuButton() {
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

    const closeMenu = () => setShowMenu(false);

    const ulClassName = "menu-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={toggleMenu}>
                <i className="fa-solid fa-bars" style={{ color: "#ffffff", fontSize: 24 }}></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <div id="nav-menu">
                    <div id="menu-clickable"><li><button onClick={e => { e.preventDefault(); navigate('/'); closeMenu() }}>Home</button></li></div>
                    <div id="menu-clickable"><li><button onClick={e => { e.preventDefault(); navigate('/shop/products'); closeMenu() }}>Shop All</button></li></div>
                    <div id="menu-clickable">
                        <li>
                            <SubMenuButton theUlClassName={'men'} menuOptName={'Men'} 
                            subMenuOptsArray={['Hats','Shirts', 'Hoodies', 'Pants', 'Shorts', 'Socks', 'Accessories' ]}
                            subMenuOptsLinks={
                                ['/shop/products/query/?gender=men&category=hats', '/shop/products/query/?gender=men&category=shirts', 
                                    '/shop/products/query/?gender=men&category=hoodies', '/shop/products/query/?gender=men&category=pants', 
                                    '/shop/products/query/?gender=men&category=shorts', '/shop/products/query/?gender=men&category=socks',
                                    '/shop/products/query/?gender=men&category=accessories'
                                ]
                            }
                            closeMenu={closeMenu}
                            />
                        </li>
                    </div>
                    <div id="menu-clickable">
                        <li>
                            <SubMenuButton theUlClassName={'women'} menuOptName={'Women'} 
                            subMenuOptsArray={['Hats','Shirts', 'Hoodies', 'Pants', 'Shorts', 'Socks', 'Accessories' ]}
                            subMenuOptsLinks={
                                ['/shop/products/query/?gender=women&category=hats', '/shop/products/query/?gender=women&category=shirts', 
                                    '/shop/products/query/?gender=women&category=hoodies', '/shop/products/query/?gender=women&category=pants', 
                                    '/shop/products/query/?gender=women&category=shorts', '/shop/products/query/?gender=women&category=socks',
                                    '/shop/products/query/?gender=women&category=accessories'
                                ]
                            }
                            closeMenu={closeMenu}
                            />
                        </li>
                    </div>
                </div>
            </ul>
        </>
    );
}

export default MenuButton;