import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const WishlistTile = ({ item, setWishList }) => {
    const [itemSize, setItemSize] = useState('small')
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        if (item && item.size && item.size === 'universal') setItemSize('universal')
    }, [item])

    const removeFromWishLst = (e = null) => {
        if (e) e.preventDefault()
            let wishLst = JSON.parse(localStorage.getItem('wishlist'))
    
            if (user && user.username && wishLst && wishLst[user.username] && wishLst[user.username].items) {
                let newWishLst = { ...wishLst }
                delete newWishLst[user.username].items[item.id]
                localStorage.setItem('wishlist', JSON.stringify(newWishLst));
                setWishList(newWishLst)
            }
    
            if (!user && wishLst && wishLst.items) {
                let newWishLst = { ...wishLst }
                delete newWishLst.items[item.id]
                localStorage.setItem('wishlist', JSON.stringify(newWishLst));
                setWishList(newWishLst)
            }
    }

    const addToCart = (e) => {
        e.preventDefault();

        let cart;

        if (user && user.username && localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))

            if (cart && !cart[user.username]) {
                let userCart = {};
                userCart.items = {}
                userCart.items[item.id] = {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: itemSize,
                    color: item.color,
                    price: item.price,
                    description: item.description,
                    quantity: 1,
                }
                cart[user.username] = userCart;
            }

            else if (cart && cart[user.username] && cart[user.username].items &&
                JSON.stringify(cart[user.username].items) === '{}') {
                    cart[user.username]['items'][item.id] = {
                        itemId: item.id,
                        image: item.image,
                        name: item.name,
                        size: itemSize,
                        color: item.color,
                        price: item.price,
                        description: item.description,
                        quantity: 1
                    }
                }
            
            else if (cart && cart[user.username] && cart[user.username].items && !cart[user.username].items[item.id]){
                cart[user.username]['items'][item.id] = {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: itemSize,
                    color: item.color,
                    price: item.price,
                    description: item.description,
                    quantity: 1
                }
                    }

            else if (user && user.username && cart && cart[user.username] && cart[user.username].items && cart[user.username].items[item.id]) {
                cart[user.username].items[item.id].quantity += 1
            }

            localStorage.setItem('cart', JSON.stringify(cart))
        }
        //////////////////////////////////////////////////

        else if (!user && localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));

            if(cart && !cart.items){
                cart.items = {};
                cart.items[item.id] = {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: itemSize,
                    color: item.color,
                    price: item.price,
                    description: item.description,
                    quantity: 1
                }
            }

            else if (cart && cart.items && !cart.items[item.id]) {
                cart.items[item.id] = {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: itemSize,
                    color: item.color,
                    price: item.price,
                    description: item.description,
                    quantity: 1
                }
            }

            else if (cart && cart.items && cart.items[item.id]) {
                cart.items[item.id].quantity += 1
            }

            localStorage.setItem('cart', JSON.stringify(cart))
        }

        else if (user && user.username) localStorage.setItem('cart', JSON.stringify({
            [user.username]: {
                items: {
                    [item.id]: {
                        itemId: item.id,
                        image: item.image,
                        name: item.name,
                        size: itemSize,
                        color: item.color,
                        price: item.price,
                        description: item.description,
                        quantity: 1
                    }
                }
            }
        }))

        else localStorage.setItem('cart', JSON.stringify({
            items: {
                [item.id]: {
                    itemId: item.id,
                    image: item.image,
                    name: item.name,
                    size: itemSize,
                    color: item.color,
                    price: item.price,
                    description: item.description,
                    quantity: 1
                }
            }
        }))

        alert("Item added to cart")
    }

    return (
        <div key={item.id} id={item.id} className="itemTile-wishlist">
            <NavLink to={`/shop/products/${item.itemId}`}>
                <div id="imgDiv">
                    <img src={item.image} alt="" />
                </div>
            </NavLink>
            <div>
                <div id='nameDiv'>{item.name}</div>
                <div id="priceDiv">Price: ${item.price}</div>
                <div id="colorDiv">Color: {item.color}</div>
                <div id='sizeDiv'>
                    Size:
                    {item.size === 'universal' ? <span>{item.size} </span> : <select name='sizes' id='sizes' onChange={e => setItemSize(e.target.value)}>
                        <option value='small'>SMALL</option>
                        <option value='medium'>MEDIUM</option>
                        <option value='large'>LARGE</option>
                        <option value='xl'>XL</option>
                        <option value='xxl'>XXL</option>
                        <option value='3xl'>3XL</option>
                    </select>}
                </div>
            </div>
            <div id="btnDiv">
                <button id='addToCartBtn' onClick={e => addToCart(e)}>Add to cart</button>
                <button id='removeBtn' onClick={e => removeFromWishLst(e)}>Remove</button>
            </div>
        </div>
    )
}

export default WishlistTile;