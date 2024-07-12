import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ReviewTile({ review, avgStars }) {
    let amtStars = [];
    if (avgStars) {
        for (let i = 0; i < avgStars; i++) {
            amtStars.push(i + 1)
        }
    }

    return (
        review && review.User &&
        <div id="reviewTile">
            <div id="review-stars-date">
                <div style={{ display: "inline" }}>
                    {avgStars && amtStars.map(() => (<span>⭐</span>))}
                </div>
                <span style={{paddingLeft: '20' }}>
                    {review.createdAt}
                </span>
            </div>
            <div>
                <p>
                    {review.comment}
                </p>
            </div>
        </div> || <h1>Hello</h1>
    )
}

export default ReviewTile;