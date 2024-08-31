import "./CreateReview.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../redux/session";
import { useModal } from "../../context/modal";

function CreateReviewModal({itemId}) {
//   const item = useSelector((state) => state.session.items);
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const {closeModal} = useModal();


  useEffect(() => {
    if(comment.length < 10 || !stars) setDisable(true)
    else setDisable(false)
  }, [comment, stars])

  const submitReview = async (e) => {
    e.preventDefault();

    console.log("submit review")

    let regExp = /[a-zA-Z]/g;

    if(comment.length < 10) {
      let newErrs = {...errors}
      newErrs.comment = 'Comment must contain 10 characters or more.'
      setErrors(newErrs)
      return
    }

    if (!regExp.test(comment.trim())) {
      let newErrs = {...errors}
      newErrs.comment = 'Comment cannot be all spaces :)'
      setErrors(newErrs)
      return
    }

    if(Number(stars) < 1){
      let newErrs = {...errors}
      newErrs.comment = 'Stars must be selected.'
      setErrors(newErrs)
      return
    }

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
          onChange={(e) => {setComment(e.target.value); setErrors({})}}
          required
        ></textarea>
      </div>
      <div >
      {errors && errors.comment && <p id='error'>{errors.comment}</p>}
      {errors && errors.stars && <p id='error'>{errors.stars}</p>}
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
        <button className={disable ? 'button-disabled' : 'button'} type="submit" onClick={e => submitReview(e)} disabled={disable}>
          Submit Your Review
        </button>
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
      {disable && <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>Comment must be at least 10 characters and stars must be selected</p>}
    </form>
  );
}

export default CreateReviewModal;