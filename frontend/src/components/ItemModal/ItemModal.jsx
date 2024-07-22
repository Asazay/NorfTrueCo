import './ItemModal.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemByIdThunk } from "../../redux/session";
import { getReviewsByIdThunk } from '../../redux/session';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ReviewTile from '../ItemPage/ReviewTitle';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useModal } from "../../context/modal";

function ItemModal({ itemId }) {
    const item = useSelector(state => state.session.item);
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.session.reviews)
    const dispatch = useDispatch()
    // const { itemId } = useParams()
    const [itemSize, setItemSize] = useState('small')
    const navigate = useNavigate()
    const {closeModal} = useModal();
    const isItemModal = true;

    useEffect(() => {
        dispatch(getItemByIdThunk(itemId)).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        });

        dispatch(getReviewsByIdThunk(itemId)).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        })
    }, [dispatch])

    useEffect(() => {
        if (item && item.size && item.size === 'universal') setItemSize('universal')
    }, [item])


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

        if (localStorage.getItem('cart')) {
            console.log('getItem ran')
            cart = JSON.parse(localStorage.getItem('cart'))
            if (cart && !cart.items[item.id]) {
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

            else if (cart && cart.items[item.id]) {
                cart.items[item.id].quantity += 1
            }

            localStorage.setItem('cart', JSON.stringify(cart))
        }

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
        item && <div id='item-modal'>
            <div id='item-content-modal'>
                <div style={{display: 'flex' }}>
                    <div id='image-div-modal'>
                        <img src={item.image} alt='' />
                    </div>
                    <div id='item-info-modal'>
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
                            <button className='inline-btn' onClick={() => closeModal()}>Continue shopping</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id='reviewDiv-modal'>
                <div id='reviews-heading-modal'>
                    <span style={{ fontSize: 36 }}>Reviews </span>
                    <span style={{ display: 'inline', paddingLeft: 10 }}>⭐{reviews && reviews.avgStars && reviews.avgStars.toFixed(1)} ({reviews && reviews.totalReviews} reviews)</span>

                </div>
                <div id='review-tiles-div-modal'>
                    {/* {user && userCommented() === false && <div id='submitReviewDiv'><OpenModalButton itemText={'Submit a review'} modalComponent={<CreateReviewModal itemId={item.id} />} /></div>} */}
                    {reviews && Object.values(reviews.reviews).length > 0 && Object.values(reviews.reviews)
                    .map(review => (<ReviewTile key={review.id} review={review} userCommented={userCommented()} isItemModal={isItemModal}/>)) || 
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><h4 style={{justifySelf: 'center'}}>No Reviews</h4></div>}
                </div>
            </div>
        </div>
    )
}

export default ItemModal;