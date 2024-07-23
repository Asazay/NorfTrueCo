import './ShoppingCart.css'
import React, { useEffect, useState } from "react";
import { useModal } from "../../context/modal";
import ShoppingCartItem from "./ShoppingCartItem";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShoppingCartModal() {
    const user = useSelector(state => state.session.user)
    const [cart, setCart] = useState({})
    const [empty, setEmpty] = useState(true);
    const [total, setTotal] = useState(0);
    const [locked, setLocked] = useState(false)
    const { closeModal } = useModal()
    const navigate = useNavigate();

    useEffect(() => {
        if ((!user && !cart || !user && cart && cart.items && JSON.stringify(cart.items) === '{}') || 
        (user && !cart || (user && user.username && cart && !cart[user.username]) || user && JSON.stringify(cart[user.username].items) === '{}')) setLocked(true)
        else if (cart && locked === true) setLocked(false)

        let cartTotal;

        if (user && user.username && cart && cart[user.username] && cart[user.username].items) cartTotal = Object.values(cart[user.username].items).reduce((acc, item) => acc += item.price * item.quantity, 0);
        else if (!user && cart && cart.items) cartTotal = Object.values(cart.items).reduce((acc, item) => acc += item.price * item.quantity, 0);

        setTotal(cartTotal)
        if (user && user.username && cart && cart[user.username]){
            console.log(cart)
            cart[user.username].total = cartTotal;
        }

        if (!user && cart && cart.total){
            cart.total = cartTotal;
        }
        //  localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const clearCart = (e) => {
        e.preventDefault();

        if (user && user.username && cart && cart[user.username]) {
            let clearedCart = JSON.parse(localStorage.getItem('cart'));

            if(user && user.username && clearedCart && clearedCart[user.username] && clearedCart[user.username].items){
                clearedCart[user.username] = null;
                // delete clearedCart[user.username].total;
            }

            localStorage.setItem('cart', JSON.stringify(clearedCart))
            setCart(null)
            if (empty === false) setEmpty(true)
        }

        if (!user && cart) {
            let clearedCart = JSON.parse(localStorage.getItem('cart'));

            if(clearedCart && clearedCart.items && JSON.stringify(clearedCart.items) === '{}'){
                return
            }

            else if(clearedCart && clearedCart.items){
                clearedCart.items = {}
                if(clearedCart.total) delete clearedCart.total;
            }

            localStorage.setItem('cart', JSON.stringify(clearedCart))
            setCart(null)
            if (empty === false) setEmpty(true)
        }
    }

    const handleCheckout = (e) => {
        e.preventDefault();
        if (window.location.href = '/checkout') {
            // navigate('/checkout')
            window.location.assign('/checkout')
        }

        else {
            navigate('/checkout');
            closeModal()
        }
    }

    useEffect(() => {
        // if(localStorage.getItem('cart') === '{}') setEmpty(true)

        if (user && user.username && localStorage.getItem('cart') !== null) {
            let userCart = JSON.parse(localStorage.getItem('cart'))
            if (userCart && userCart[user.username] && userCart[user.username].items) {
                let cartTotal = Object.values(userCart[user.username].items).reduce((acc, item) => acc += item.price * item.quantity, 0);
                userCart[user.username].total = cartTotal;
                setCart(userCart)
                setEmpty(false)
                setTotal(cartTotal)
                console.log(userCart)
            }
        }

        else if (!user && localStorage.getItem('cart') !== null) {
            let userCart = JSON.parse(localStorage.getItem('cart'))
            let cartTotal;

            if(userCart && userCart.items){
                cartTotal = Object.values(userCart.items).reduce((acc, item) => acc += item.price * item.quantity, 0);
            }

            userCart.total = cartTotal;
            setCart(userCart)
            setEmpty(false)
            setTotal(cartTotal)
            console.log(userCart)
        }
        else setLocked(true)
    }, []);

    return (
        <div id="shopping-cart">
            <div id='h2'><h2>Shopping Cart</h2></div>
            <div id="columnTitles">
                <div key='product-image' className='itemEl'><span>Product Image</span></div>
                <div key='name' className='itemEl'><span>Name</span></div>
                <div key='size' className='itemEl'><span>Size</span></div>
                <div key='color' className='itemEl'><span>Color</span></div>
                <div key='unit-price' className='itemEl'><span>Unit Price</span></div>
                <div key='quantity' className='itemEl'><span>Qty</span></div>
            </div>
            {(user && user.username && cart && cart[user.username] && cart[user.username].items && <div id="itemGrid">
                {cart[user.username]['items'] && Object.values(cart[user.username]['items']) && Object.values(cart[user.username]['items'])
                .map(item => (<ShoppingCartItem key={item.id} item={item} cart={cart} setCart={setCart} />))}
            </div>)}
            {(user && !cart || user && user.username && cart && !cart[user.username] || user && user.username && cart && cart[user.username] && JSON.stringify(cart[user.username].items) === '{}') 
            && <div id='itemGrid'><h1 style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>Cart is empty</h1></div>}

            {(!user && cart && cart.items && <div id="itemGrid">
                {cart.items && Object.values(cart.items) && Object.values(cart.items)
                .map(item => (<ShoppingCartItem key={item.id} item={item} cart={cart} setCart={setCart} />))}
            </div>)}
            {(!user && !cart || !user && !cart.items || !user && cart && cart.items && JSON.stringify(cart.items) === '{}') 
            && <div id='itemGrid'><h1 style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>Cart is empty</h1></div>}

            {user && user.username && cart && cart[user.username] && cart[user.username].items && Object.values(cart[user.username].items).length > 0 && <div id='total-div'>
                <h3>Subtotal: ${total && total.toFixed(2)}</h3>
            </div>}

            {!user && cart && cart.items && Object.values(cart.items).length > 0 && <div id='total-div'>
                <h3>Subtotal: ${total && total.toFixed(2)}</h3>
            </div>}

            <div id='cart-btns'>
                <div><button onClick={
                    () => {
                        navigate('/shop/products')

                        closeModal()
                    }
                }>CONTINUE SHOPPING</button></div>
                <div><button onClick={e => clearCart(e)}>CLEAR CART</button></div>
                <div><button disabled={locked} onClick={e => handleCheckout(e)}>CHECKOUT</button></div>
            </div>
        </div>
    )
}

export default ShoppingCartModal