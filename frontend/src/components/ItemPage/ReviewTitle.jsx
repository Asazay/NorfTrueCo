import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import UpdateReviewModal from "../UpdateReviewModa;/UpdateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

function ReviewTile({ review, userCommented, isItemModal = false}) {
    const user = useSelector(state => state.session.user);
    let amtStars = [];

    if (review.stars) {
        for (let i = 0; i < review.stars; i++) {
            amtStars.push(i + 1)
        }
    }

    return (
        <div>
            {review && <div id="reviewTile">
                <div id="review-stars-date">
                    <div style={{ display: "inline" }}>
                        {review.stars && amtStars.map((i) => (<span key={i}>⭐</span>))}
                    </div>
                    <span style={{ paddingLeft: 10 }}>
                        {review.createdAt}
                    </span>
                </div>
                <div>
                    <p>
                        {review.comment}
                    </p>
                </div>
                {userCommented === true && user.id === review.user_id && !isItemModal &&
                <div id="edit-delete-review">
                    <div><OpenModalButton itemText={'Update'} modalComponent={<UpdateReviewModal reviewId={review.id} itemId={review.item_id}/>}/></div>
                    <div><OpenModalButton itemText={'Delete'} modalComponent={<DeleteReviewModal reviewId={review.id} itemId={review.item_id}/>}/></div>
                </div>
                }
            </div>}
        </div>
    )
}

export default ReviewTile;