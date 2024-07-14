import './DeleteReview.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/modal";
import { deleteReviewThunk } from "../../redux/session";

function DeleteReviewModal({ reviewId, itemId }) {
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(itemId, reviewId)).then(() => { closeModal(); })
    }


    return (
        <div id='deleteRevMod'>
            <h2>Confirm Deletion</h2>
            <div id='buttons'>
                <div><button onClick={e => confirmDelete(e)}>Confirm</button></div>
                <div><button onClick={closeModal}>Cancel</button></div>
            </div>
        </div>
    )
}

export default DeleteReviewModal;