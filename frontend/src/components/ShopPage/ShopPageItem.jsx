import { NavLink } from "react-router-dom";
import ItemModal from '../ItemModal/ItemModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { useState, useEffect } from "react";

const ShopPageItem = ({ item }) => {
    const [liked, setLiked] = useState(false)
    const [wishlist, setWishList] = useState();

    useEffect(() => {
        if (localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));

            setWishList(wishLst)

            if (item && wishLst.items && wishLst.items[item.id]) {
                setLiked(true)
            }
        }
    }, [])

    const addToWishLst = (e) => {
        if(wishlist) console.log(wishlist)
        e.preventDefault()

        let wishLst;

        if (localStorage.getItem('wishlist')) {
            wishLst = JSON.parse(localStorage.getItem('wishlist'))
            if (wishLst && !wishLst.items[item.id]) {
                wishLst.items[item.id] = {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: item.size,
                    color: item.color,
                    price: item.price,
                    description: item.description
                }
            }

            localStorage.setItem('wishlist', JSON.stringify(wishLst))
            setLiked(true)
        }

        else {
            localStorage.setItem('wishlist', JSON.stringify({
                items: {
                    [item.id]: {
                        itemId: item.id,
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
        if (wishLst && wishLst.items) {
            let newWishLst = { ...wishLst }
            delete newWishLst.items[item.id]
            localStorage.setItem('wishlist', JSON.stringify(newWishLst));
            setWishList(newWishLst)
            setLiked(false)
        }
        if(wishlist) console.log(wishlist)
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