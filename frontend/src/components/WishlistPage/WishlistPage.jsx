import './WishlistPage.css'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import WishlistTile from './WishlistTile';

function WishlistPage() {
    const [wishlist, setWishList] = useState();

    useEffect(() => {
        if (localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));
            console.log(wishLst)

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
                {(wishlist && wishlist.items && Object.values(wishlist).length > 0 && Object.values(wishlist.items)
                    .map(item => (<WishlistTile key={item.itemId} item={item} setWishList={setWishList} />)))}
            </div>
            {!wishlist || Object.values(wishlist.items).length < 1 && <div id='no-results-wishlist'><h2>Wishlist empty</h2></div>}
        </div>
    )
}

export default WishlistPage;