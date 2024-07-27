import './WishlistPage.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import WishlistTile from './WishlistTile';
import { useSelector } from 'react-redux';

function WishlistPage() {
    const [wishlist, setWishList] = useState();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));
            setWishList(wishLst)
        }
    }, [])

    return (
        <div id='wishlist-page'>
            <div id='linkDiv'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/shop/products'>Shop</NavLink>
            </div>
            <div id='wishlist-h1'><h1>Wishlist</h1></div>
            <div id='item-grid'>
                {(user && user.username && wishlist && wishlist[user.username] && wishlist[user.username].items && 
                Object.keys(wishlist[user.username]).length > 0 && Object.values(wishlist[user.username].items)
                    .map(item => (<WishlistTile key={item.itemId} item={item} setWishList={setWishList} />)))}
                
                {(!user && wishlist && wishlist.items && Object.values(wishlist).length > 0 && Object.values(wishlist.items)
                    .map(item => (<WishlistTile key={item.itemId} item={item} setWishList={setWishList} />)))}
            </div>
            {(user && user.username && !wishlist) || 
            user && user.username && wishlist && wishlist[user.username] && wishlist[user.username].items && 
            Object.values(wishlist[user.username].items).length < 1 && <div id='no-results-wishlist'><h2>Wishlist empty</h2></div>}

            {(!user && !wishlist )|| wishlist && wishlist.items && Object.values(wishlist.items).length < 1 && <div id='no-results-wishlist'><h2>Wishlist empty</h2></div>}
        </div>
    )
}

export default WishlistPage;