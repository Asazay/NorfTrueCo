import './ShoppingCart.css'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/modal";
import ShoppingCartItem from "./ShoppingCartItem";
import { json } from 'react-router-dom';


function ShoppingCartModal() {
    const [empty, setEmpty] = useState(true)
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {
    if(localStorage.getItem('cart') !== null){
        let userCart = JSON.parse(localStorage.getItem('cart'))
        let cartTotal = Object.values(userCart.items).slice().reduce((acc, item )=> acc += item.price, 0);
        setCart(userCart)
        setEmpty(false)
        setTotal(cartTotal)
    }
    }, [localStorage])

    const clearCart = (e) => {
        e.preventDefault();

        if(cart){
            localStorage.removeItem('cart')
            setCart(null)
            if(empty === false) setEmpty(true)
        }
    }

    return (
        <div id="shopping-cart">
            <div id='h2'><h2>Shopping Cart</h2></div>
            <div id="columnTitles">
                <div className='itemEl'><span>Product Image</span></div>
                <div className='itemEl'><span>Name</span></div>
                <div className='itemEl'><span>Unit Price</span></div>
                <div className='itemEl'><span>Qty</span></div>
            </div>
            {cart !== null && <div id="itemGrid">
                {cart !== null && Object.values(cart.items).map(item => (<ShoppingCartItem key={item.id} item={item} />))}
                {!cart && <h3>Shopping cart empty</h3>}
            </div> || <div><h1 style={{alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>Cart is empty</h1></div>}
            {cart && <div id='total-div'>
                <h2>Total: ${total}</h2>
            </div>}
            <div id='cart-btns'>
                <div><button>CONTINUE SHOPPING</button></div>
                <div><button onClick={e => clearCart(e)}>CLEAR CART</button></div>
                <div><button>CHECKOUT</button></div>
            </div>
        </div>
    )
}

export default ShoppingCartModal