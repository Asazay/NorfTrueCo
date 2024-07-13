import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ReviewTile({ review, avgStars, userCommented }) {
    let amtStars = [];
    if (avgStars) {
        for (let i = 0; i < avgStars; i++) {
            amtStars.push(i + 1)
        }
    }

    return (
        <div>
            {review && <div id="reviewTile">
                <div id="review-stars-date">
                    <div style={{ display: "inline" }}>
                        {avgStars && amtStars.map((i) => (<span key={i}>⭐</span>))}
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
                {userCommented() === true && 
                <div id="edit-delete-review">
                    <div><button>Edit Review</button></div>
                    <div><button>Delete Review</button></div>
                </div>
                }
            </div>}
        </div>
    )
}

export default ReviewTile;