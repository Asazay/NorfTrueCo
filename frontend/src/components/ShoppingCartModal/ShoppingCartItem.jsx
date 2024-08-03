import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";



function ShoppingCartItem({ item, cart, setCart }) {
    const user = useSelector(state => state.session.user)
    const [quantity, setQuantity] = useState(item ? item.quantity : "");
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (item && item.quantity) setQuantity(item.quantity)
    }, []);

    const setNewQuantity = async (val) => {
        if (user && cart && cart[user.username] && cart[user.username].items && cart[user.username].items[item.itemId] &&
            cart[user.username].items[item.itemId].price) {
            cart[user.username].items[item.itemId]['quantity'] = parseInt(val);
            let newCart = { ...cart };
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart)
        }

        else if (!user && cart && cart.items && cart.items[item.itemId] && cart.items[item.itemId].price) {
            cart.items[item.itemId]['quantity'] = parseInt(val);
            let newCart = { ...cart };
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
        if (e) e.preventDefault()

        if (user && user.username && cart && cart[user.username] && cart[user.username].items && cart[user.username].items[item.itemId]) {
            delete cart[user.username].items[item.itemId]
            delete cart[user.username].total;
            let newCart = { ...cart }
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart)
        }

        else if (!user && cart) {
            delete cart.items[item.itemId]
            delete cart.total;
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
                    <input type='number' value={quantity} min={0} max={25} onChange={(e) => {
                        if(e.target.value < 0 || e.target.value > 25){
                            let newErrs = {...errors};
                            newErrs.quantity = 'Quantity must be between 0 and 25'
                            setErrors(newErrs)
                        }
                        else {
                            if(errors.quantity){
                                let newErrs = {...errors}
                                delete newErrs.quantity
                                setErrors(newErrs)
                            }
                            setQuantity(e.target.value)
                        }
                    }} />
                    <button style={{marginLeft: '5px', border: 'none', color: 'red', width: '30px'}} onClick={e => {
                        e.preventDefault()
                        removeItem(e)
                    }}>Remove</button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCartItem;