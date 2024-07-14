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
            <div id='h2'><h2>Shopping Cart</h2></div>
            <div id="columnTitles">
                <div className='itemEl'><span>Product Image</span></div>
                <div className='itemEl'><span>Name</span></div>
                <div className='itemEl'><span>Unit Price</span></div>
                <div className='itemEl'><span>Qty</span></div>
            </div>
            <div id="itemGrid">
                {cart && cart.map(item => (<ShoppingCartItem item={item} />))}
                {!cart && <h3>Shopping cart empty</h3>}
            </div>
            <div id='total-div'>
                <h2>Total: ${total}</h2>
            </div>
            <div id='cart-btns'>
                <div><button>CONTINUE SHOPPING</button></div>
                <div><button>CLEAR CART</button></div>
                <div><button>CHECKOUT</button></div>
            </div>
        </div>
    )
}

export default ShoppingCartModal