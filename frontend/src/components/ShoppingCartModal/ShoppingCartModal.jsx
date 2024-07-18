import './ShoppingCart.css'
import React, { useEffect, useState } from "react";
import { useModal } from "../../context/modal";
import ShoppingCartItem from "./ShoppingCartItem";
import { useNavigate } from 'react-router-dom';



function ShoppingCartModal() {
    const [empty, setEmpty] = useState(true);
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(0);
    const [locked, setLocked] = useState(false)
    const { closeModal } = useModal()
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            let userCart = JSON.parse(localStorage.getItem('cart'))
            let cartTotal = Object.values(userCart.items).reduce((acc, item) => acc += item.price * item.quantity, 0);
            userCart.total = cartTotal;
            setCart(userCart)
            setEmpty(false)
            setTotal(cartTotal)
        }
        else setLocked(true)
    }, [localStorage]);

    useEffect(() => {
        console.log(cart)
        if (!cart || cart && JSON.stringify(cart.items) === '{}') setLocked(true)
        else if (cart && locked === true) setLocked(false)
        let cartTotal;
        if (cart) cartTotal = Object.values(cart.items).reduce((acc, item) => acc += item.price * item.quantity, 0);
        setTotal(cartTotal)
        // if(cart && cart.total) cart.total = cartTotal;
        //  localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const clearCart = (e) => {
        e.preventDefault();

        if (cart) {
            localStorage.removeItem('cart')
            setCart(null)
            if (empty === false) setEmpty(true)
        }
    }

    return (
        <div id="shopping-cart">
            <div id='h2'><h2>Shopping Cart</h2></div>
            <div id="columnTitles">
                <div className='itemEl'><span>Product Image</span></div>
                <div className='itemEl'><span>Name</span></div>
                <div className='itemEl'><span>Size</span></div>
                <div className='itemEl'><span>Color</span></div>
                <div className='itemEl'><span>Unit Price</span></div>
                <div className='itemEl'><span>Qty</span></div>
            </div>
            {(cart !== null && <div id="itemGrid">
                {cart.items && Object.values(cart.items).map(item => (<ShoppingCartItem key={item.id} item={item} cart={cart} setCart={setCart} />))}
                {!Object.values(cart.items).length && <div><h1 style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>Cart is empty</h1></div>}
            </div>) || <div id='itemGrid'><h1 style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>Cart is empty</h1></div>}
            {cart && cart.items && Object.values(cart.items).length > 0 && <div id='total-div'>
                <h3>Total: ${total && total.toFixed(2)}</h3>
            </div>}
            <div id='cart-btns'>
                <div><button onClick={
                    () => {
                        navigate('/shop/products')

                        closeModal()
                    }
                }>CONTINUE SHOPPING</button></div>
                <div><button onClick={e => clearCart(e)}>CLEAR CART</button></div>
                <div><button disabled={locked} onClick={() => {
                    if (window.location.href = '/checkout') {
                        closeModal()
                    }
                    navigate('/checkout');
                    navigate(0)
                    closeModal()
                }
                }>CHECKOUT</button></div>
            </div>
        </div>
    )
}

export default ShoppingCartModal