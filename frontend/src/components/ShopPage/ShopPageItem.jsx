import { NavLink } from "react-router-dom";
import ItemModal from '../ItemModal/ItemModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ShopPageItem = ({ item }) => {
    const [liked, setLiked] = useState(false)
    const [wishlist, setWishList] = useState();
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (user && user.username && localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));

            setWishList(wishLst)

            if (!user && item && wishLst && wishLst[user.username] && wishLst[user.username].items && wishLst.items[item.id]) {
                setLiked(true)
            }
        }

        if (!user && localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));

            setWishList(wishLst)

            if (item && wishLst.items && wishLst.items[item.id]) {
                setLiked(true)
            }
        }
    }, [])

    const addToWishLst = (e) => {
        e.preventDefault()

        let wishLst;

        if (user && user.username && localStorage.getItem('wishlist')) {
            wishLst = JSON.parse(localStorage.getItem('wishlist'))
            if (wishLst && wishLst[user.username] && !wishLst[user.username].items[item.id]) {
                wishLst[user.username].items[item.id] = {
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    size: item.size,
                    color: item.color,
                    price: item.price,
                    description: item.description
                }
            }

            else if (user && user.username && wishLst && !wishLst[user.username]) {
                wishLst = JSON.parse(localStorage.getItem('wishlist'))
                wishLst[user.username] = {
                    items: {
                        [item.id]: {
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            size: item.size,
                            color: item.color,
                            price: item.price,
                            description: item.description
                        }
                    }
                }
                setLiked(true)
            }

            localStorage.setItem('wishlist', JSON.stringify(wishLst))
            setLiked(true)
        }

        else if (!user && localStorage.getItem('wishlist')) {
            wishLst = JSON.parse(localStorage.getItem('wishlist'))
            if (item && item.id && wishLst && wishLst.items && !wishLst.items[item.id]) {
                wishLst.items[item.id] = {
                    id: item.id,
                    image: item.image,
                    name: item.name,
                    size: item.size,
                    color: item.color,
                    price: item.price,
                    description: item.description
                }
            }

            else if (item && item.id && wishLst && !wishLst.items) {
                wishLst.items = {
                    [item.id]: {
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        size: item.size,
                        color: item.color,
                        price: item.price,
                        description: item.description
                    }
                }
            }

            localStorage.setItem('wishlist', JSON.stringify(wishLst))
            setLiked(true)
        }

        else if (user && user.username && !localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify({
                [user.username]: {
                    items: {
                        [item.id]: {
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            size: item.size,
                            color: item.color,
                            price: item.price,
                            description: item.description
                        }
                    }
                }
            }));
            setLiked(true)
        }

        else if (!user && !localStorage.getItem('wishlist')) {
            localStorage.setItem('wishlist', JSON.stringify({
                items: {
                    [item.id]: {
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        size: item.size,
                        color: item.color,
                        price: item.price,
                        description: item.description
                    }
                }
            }));
            setLiked(true)
        }
    }

    const removeFromWishLst = (e = null) => {

        if (e) e.preventDefault()
        let wishLst = JSON.parse(localStorage.getItem('wishlist'))

        if (user && user.username && wishLst && wishLst[user.username] && wishLst[user.username].items && wishLst[user.username].items[item.id]) {
            let newWishLst = { ...wishLst }
            delete newWishLst[user.username].items[item.id]
            localStorage.setItem('wishlist', JSON.stringify(newWishLst));
            setWishList(newWishLst)
            setLiked(false)
        }

        if (!user && wishLst && wishLst.items) {
            let newWishLst = { ...wishLst }
            delete newWishLst.items[item.id]
            localStorage.setItem('wishlist', JSON.stringify(newWishLst));
            setWishList(newWishLst)
            setLiked(false)
        }
    }

    return (
        <div id={item.id} className="itemTile">
            <NavLink to={`/shop/products/${item.id}`}>
                <div>
                    <div id="imgDiv">
                        {liked && <button id='page-item-heart' onClick={e => removeFromWishLst(e)}>
                            <i className="fa-solid fa-heart" style={{ color: '#d70404', fontSize: '24px' }}>
                            </i>
                        </button>}
                        {!liked && <button id='page-item-heart' onClick={e => addToWishLst(e)}>
                            <i className="fa-regular fa-heart" style={{ color: '#d70404', fontSize: '24px' }}>
                            </i>
                        </button>}
                        <img src={item.image} alt="" />
                    </div>
                    <div id='nameDiv'>{item.name}</div>
                    <div id="priceDiv">${item.price}</div>
                </div>
            </NavLink>
            <div id='selectOptsDiv'><OpenModalButton item={item} itemText={'Quick View'} modalComponent={<ItemModal itemId={item.id} />} /></div>
        </div>
    )
}

export default ShopPageItem;