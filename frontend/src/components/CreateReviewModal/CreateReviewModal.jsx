import "./CreateReview.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../redux/session";
import { useModal } from "../../context/modal";

function CreateReviewModal({itemId}) {
//   const item = useSelector((state) => state.session.items);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const {closeModal} = useModal();

  useEffect(() => {
    setErrors({})
    if (comment.length < 10 || Number(stars) < 1) setDisable(true);
    else setDisable(false);
  }, [comment, stars]);

  const submitReview = async (e) => {
    e.preventDefault();
    const newReview = {
      comment,
      stars,
    };

    await dispatch(createReviewThunk(itemId, newReview)).then(() => {closeModal();}).catch(res => {
        const data = res.json();
        if(data && data.errors){
            setErrors(data.errors);
        }
    });
  };

  return (
    <form id="createReviewForm">
      <div>
        <h1>What's on your mind?</h1>
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
      </div>
    </form>
  );
}

export default CreateReviewModal;