import React, { useState, useEffect } from "react";



function ShoppingCartItem({ item, cart, setCart }) {
    const [quantity, setQuantity] = useState(item ? item.quantity: "");

    useEffect(() => {
        if (item && item.quantity) setQuantity(item.quantity)
    }, []);

    const setNewQuantity = async (val) => {
        if (cart && cart.items && cart.items[item.itemId] && cart.items[item.itemId].price) {
            cart.items[item.itemId]['quantity'] = parseInt(val);
            let newCart = {...cart};
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart)
        }
    }

    useEffect(() => {
        if (quantity == 0) {
            removeItem()
        }
        else setNewQuantity(quantity)
    }, [quantity])


    const removeItem = (e = null) => {
        if(e) e.preventDefault()
        if (cart) {
            delete cart.items[item.itemId]
            let newCart = { ...cart }
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart)
        }
    }

    return (
        <>
            <div className="cartItem">
                <div id="itemImage" className="itemEl"><img src={item.image} width={50} height={50} alt="" /></div>
                <div id="itemName-name" className="itemEl"><span>{item.name}</span></div>
                <div id="itemName-size" className="itemEl"><span>{item && item.size && item.size.toUpperCase()}</span></div>
                <div id="itemName-color" className="itemEl"><span>{item && item.color && item.color.toUpperCase()}</span></div>
                <div id="itemPrice" className="itemEl"><span>${item.price}</span></div>
                <div id="itemQuantity" className="itemEl">
                    <input type='number' value={quantity} min={0} max={25} onChange={(e) => setQuantity(e.target.value)} />
                    <button onClick={e => removeItem(e)}>Remove</button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartItem;