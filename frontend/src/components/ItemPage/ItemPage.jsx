import './ItemPage.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getItemByIdThunk } from "../../redux/session";
import { getReviewsByIdThunk } from '../../redux/session';
import { getReviewsArraySelector } from '../../redux/session';
import { useParams } from "react-router-dom";
import ReviewTile from './ReviewTitle';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';

function ItemPage() {
    const item = useSelector(state => state.session.items);
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.session.reviews)
    const dispatch = useDispatch()
    const { itemId } = useParams()

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
        // console.log('Reviews causes re-render')

    }, [reviews])

    const userCommented = () => {
        let value = false;

        if (reviews) {
            Object.values(reviews.reviews).forEach(review => {
                if (user && review.user_id == user.id) {
                    value = true;
                }
            });
        }

        return value;
    };

    return (
        item && <div id='item-page'>
            <div id='item-content'>
                <div id='image-div'>
                    <img src={item.image} alt='image' />
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
                        {item.size === 'universal' ? <h3>{item.size}</h3> : <select name='sizes' id='sizes'>
                            <option value='small'>SMALL</option>
                            <option value='medium'>MEDIUM</option>
                            <option value='large'>LARGE</option>
                            <option value='xl'>XL</option>
                            <option value='xxl'>XXL</option>
                            <option value='3xl'>3XL</option>
                        </select>}
                    </div>
                    <div>
                        <button>Add to cart</button>
                        <button className='inline-btn'>Continue shopping</button>
                    </div>
                </div>
            </div>
            <div id='reviewDiv'>
                <div id='reviews-heading'>
                    <span style={{ fontSize: 36 }}>Reviews </span>
                    <span style={{ display: 'inline', paddingLeft: 10 }}>⭐{reviews.avgStars} ({reviews && reviews.totalReviews} reviews)</span>
                </div>
                <div id='review-tiles-div'>
                    {user && userCommented() === false && <div><OpenModalButton itemText={'Submit a review'} modalComponent={<CreateReviewModal itemId={item.id} />} /></div>}
                    {reviews && Object.values(reviews.reviews).length > 0 && Object.values(reviews.reviews).map(review => (<ReviewTile key={review.id} review={review} userCommented={userCommented()} />))}
                </div>
            </div>
        </div>
    )
}

export default ItemPage;