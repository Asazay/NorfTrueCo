import './ItemPage.css'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemByIdThunk } from "../../redux/session";
import { useParams } from "react-router-dom";
import ReviewTile from './ReviewTitle';

function ItemPage() {
    const item = useSelector(state => state.session.items)
    const dispatch = useDispatch()
    const { itemId } = useParams()

    useEffect(() => {
        dispatch(getItemByIdThunk(itemId)).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        })
    }, [dispatch])

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
                    <span style={{ display: 'inline', paddingLeft: 10, color: '#A70000' }}>({item.reviewCount} reviews)</span>
                </div>
                <div id='review-tiles-div'>
                    {item.Reviews && item.Reviews.length && item.Reviews.map(review => (<ReviewTile key={review.id} review={review} avgStars={item.avgStars}/>))}
                </div>
            </div>
        </div>
        // item &&
        // <div id='item-page'>
        //     <div className='img-div'>
        //         <div>
        //             <img src={item.image} alt='image' />
        //         </div>
        //     </div>
        //     <div className='item-info'>
        // <div><p>{item.name}</p></div>
        // <div>
        //     <label htmlFor='color'>Color :</label>
        //     <span name='color'>{item.color}</span>
        // </div>
        // <div>
        //     <label htmlFor='size'>Size: </label>
        //     {item.size === 'universal' ? <span>{item.size}</span> : <select name='sizes' id='sizes'>
        //         <option value='small'>SMALL</option>
        //         <option value='medium'>MEDIUM</option>
        //         <option value='large'>LARGE</option>
        //         <option value='xl'>XL</option>
        //         <option value='xxl'>XXL</option>
        //         <option value='3xl'>3XL</option>
        //     </select>}
        // </div>
        //     </div>
        // </div>
    )
}

export default ItemPage;