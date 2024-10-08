import './ItemPage.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemByIdThunk } from "../../redux/session";
import { getReviewsByIdThunk } from '../../redux/session';
import { getOrdersByUserIdThunk } from '../../redux/session';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReviewTile from './ReviewTitle';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';

function ItemPage() {
    const item = useSelector(state => state.session.item);
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.session.reviews);
    const orders = useSelector(state => state.session.orders);

    const dispatch = useDispatch()
    const { itemId } = useParams()
    const [itemSize, setItemSize] = useState('small')
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const [wishlist, setWishList] = useState();
    const [itemOrdered, setItemOrdered] = useState(false)

    

    useEffect(() => {
        console.log(itemOrdered)
    }, [itemOrdered])

    useEffect(() => {
        dispatch(getItemByIdThunk(itemId)).catch(async res => {
            const data = await res.json();
            if (data && data.errors) {
                window.location.replace('/not-found')
            }
        });

        dispatch(getReviewsByIdThunk(itemId)).catch(async res => {
            const data = await res.json();
            if (data && data.errors) { }
        })
    }, [dispatch]);

    useEffect(() => {
        setItemOrdered(false)
        
        if (item && item.size && item.size === 'universal') setItemSize('universal')

        if (orders && Object.values(orders).length > 0 && item && item.id) {
            for(let order of Object.values(orders)){
                if(order && Object.values(order.Order_Items).length){
                    for (let ordIte of Object.values(order.Order_Items)){
                        if(parseInt(ordIte.item_id) === parseInt(item.id)) {
                            setItemOrdered(true)
                            return
                        }
                    }
                }
            }
        }

    }, [item, orders])

    useEffect(() => {
        if (user && user.id) dispatch(getOrdersByUserIdThunk(user.id)).catch(async res => {
            const data = await res.json();
            if (data && data.errors) { }
        });
    }, [user])

    const userCommented = () => {
        let value = false;

        if (reviews) {
            Object.values(reviews.reviews).forEach(review => {
                if (user && review.user_id === user.id) {
                    value = true;
                }
            });
        }

        return value;
    };

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
                // console.log('Line 82')
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

            else if (cart && cart[user.username] && cart[user.username].items && !cart[user.username].items[item.id]) {
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

            if (cart && !cart.items) {
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

    useEffect(() => {
        setLiked(false)
        
        if (user && user.username && localStorage.getItem('wishlist')) {
            let wishLst = JSON.parse(localStorage.getItem('wishlist'));

            setWishList(wishLst)

            if (item && item.id && wishLst && wishLst[user.username] && wishLst[user.username].items && wishLst[user.username].items[item.id]) {
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
    }, [user, item])

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
        item && <div id='item-page'>
            <div id='item-content'>
                <div style={{ display: 'flex', width: '100%', padding: '0' }}>
                    <div id='image-div'>
                        {liked && <button id='page-item-heart' onClick={e => removeFromWishLst(e)}>
                            <i className="fa-solid fa-heart" style={{ color: '#d70404', fontSize: '24px' }}>
                            </i>
                        </button>}
                        {!liked && <button id='page-item-heart' onClick={e => addToWishLst(e)}>
                            <i className="fa-regular fa-heart" style={{ color: '#d70404', fontSize: '24px' }}>
                            </i>
                        </button>}
                        <img src={item.image} alt='' />
                    </div>
                    <div id='item-info'>
                        <div><h2>{item.name}</h2></div>
                        <div><h3>${item.price}</h3></div>
                        <div>
                            <label htmlFor='color'><h3>Color: </h3></label>
                            <h3 name='color'>{item.color}</h3>
                        </div>
                        <div>
                            <label htmlFor='size'><h3>Size: </h3></label>
                            {item.size === 'universal' ? <h3>{item.size}</h3> : <select name='sizes' id='sizes' onChange={e => setItemSize(e.target.value)}>
                                <option value='small'>SMALL</option>
                                <option value='medium'>MEDIUM</option>
                                <option value='large'>LARGE</option>
                                <option value='xl'>XL</option>
                                <option value='xxl'>XXL</option>
                                <option value='3xl'>3XL</option>
                            </select>}
                        </div>
                        <div>
                            <label htmlFor='description'><h3>Description: </h3></label>
                            <div><p>{item.description}</p></div>
                        </div>
                        <div>
                            <button onClick={e => addToCart(e)}>Add to cart</button>
                            <button className='inline-btn' onClick={() => navigate('/shop/products')}>Continue shopping</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='reviewDiv'>
                <div id='reviews-heading'>
                    <span style={{ fontSize: 36 }}>Reviews </span>
                    <span style={{ display: 'inline', paddingLeft: 10 }}>⭐{reviews && reviews.avgStars == true && reviews.avgStars.toFixed(1)} ({reviews && reviews.totalReviews} reviews)</span>

                </div>
                <div id='review-tiles-div'>
                    {user && userCommented() === false && itemOrdered === true && <div id='submitReviewDiv'><OpenModalButton itemText={'Submit a review'} modalComponent={<CreateReviewModal itemId={item.id} />} /></div>}
                    {reviews && Object.values(reviews.reviews).length > 0 && Object.values(reviews.reviews).map(review => (<ReviewTile key={review.id} review={review} userCommented={userCommented()} />))
                        || <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><h4 style={{ justifySelf: 'center' }}>No Reviews</h4></div>}
                </div>
            </div>
        </div>
    )
}

export default ItemPage;