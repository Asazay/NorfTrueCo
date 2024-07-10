import './ShoppingCart.css'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/modal";
import ShoppingCartItem from "./ShoppingCartItem";

let cart = localStorage.getItem('cart');
console.log(cart)
if (cart) cart = JSON.parse(cart)
if (!cart){
    cart = [
        {
            image: '',
            name: 'Item 1',
            price: 9.99,
            quantity: 2,
        }
    ]
}

function ShoppingCartModal() {
    const [total, setTotal] = useState(cart.slice().reduce((acc, item )=> acc += item.price, 0))

    return (
        <div id="shopping-cart">
            <div id='h2-div'><h2>Shopping Cart</h2></div>
            <div id="columnTitles">
                <div><p>Product Image</p></div>
                <div><p>Name</p></div>
                <div><p>Unit Price</p></div>
                <div><p>Qty</p></div>
            </div>
            <div id="itemGrid">
                {cart && cart.map(item => (<ShoppingCartItem item={item} />))}
                {!cart && <h3>Shopping cart empty</h3>}
            </div>
        </div>
    )
}

export default ShoppingCartModal