import "./UpdateReview.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editReviewThunk } from "../../redux/session";
import { useModal } from "../../context/modal";
import { getReviewByIdThunk } from "../../redux/session";

function UpdateReviewModal({ itemId, reviewId }) {
    const review = useSelector(state => state.session.review)
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);
    const [disable, setDisable] = useState(true);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        setErrors({})
        if (comment.length < 10 || Number(stars) < 1) setDisable(true);
        else setDisable(false);
    }, [comment, stars]);

    useEffect(() => {
       if(review && review.comment && review.stars){
        setComment(review.comment)
        setStars(Number(review.stars))
        switch(Number(review.stars)){
            case 1: {
                document.getElementById('star1').setAttribute('checked', true);
                break;
            }
            case 2: {
                document.getElementById('star2').setAttribute('checked', true);
                break;
            }
            case 3: {
                document.getElementById('star13').setAttribute('checked', true);
                break;
            }
            case 4: {
                document.getElementById('star4').setAttribute('checked', true);
                break;
            }
            case 5: {
                document.getElementById('star5').setAttribute('checked', true);
                break;
            }
        }
       }
    }, [review])

    useEffect(() => {
        dispatch(getReviewByIdThunk(itemId, reviewId)).catch(async res => {
            const data = res.json();
            if (data && data.errors) console.log(data.errors)
        });

        // setComment(review.comment)
        // setStars(review.stars)
    }, [dispatch])

    const submitReview = async (e) => {
        e.preventDefault();
        const newReview = {
            comment,
            stars,
        };

        await dispatch(editReviewThunk(itemId, reviewId, newReview)).then(() => { closeModal(); });
    };

    return (
        <form id="createReviewForm">
            <div>
                <h1>Edit your review</h1>
                {errors.review && <div id="error"><p>{errors.review}</p></div>}
                {errors.stars && <div id="error"><p>{errors.stars}</p></div>}
            </div>
            <div>
                <textarea
                    cols={50}
                    rows={10}
                    placeholder="Leave your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <div id="starDiv">
                <div className="rate">
                    <input
                        type="radio"
                        id="star5"
                        name="rate"
                        value="5"
                        onChange={(e) => setStars(Number(e.target.value))}
                    />
                    <label htmlFor="star5" title="text"></label>
                    <input
                        type="radio"
                        id="star4"
                        name="rate"
                        value="4"
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <label htmlFor="star4" title="text"></label>
                    <input
                        type="radio"
                        id="star3"
                        name="rate"
                        value="3"
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <label htmlFor="star3" title="text"></label>
                    <input
                        type="radio"
                        id="star2"
                        name="rate"
                        value="2"
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <label htmlFor="star2" title="text"></label>
                    <input
                        type="radio"
                        id="star1"
                        name="rate"
                        value="1"
                        onChange={(e) => setStars(e.target.value)}
                    />
                    <label htmlFor="star1" title="text"></label>
                </div>
                <b>Stars</b>
            </div>
            <div id="buttonDiv">
                <button className='button' type="submit" onClick={e => submitReview(e)} disabled={disable}>
                    Submit Your Review
                </button>
                <button className="closeBtn" onClick={closeModal}>Cancel</button>
            </div>
        </form>
    );
}

export default UpdateReviewModal;