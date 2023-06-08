import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkAUpdateReview } from "../../store/reviewsReducer";
import { useModal } from "../../context/Modal";

const EditReview = ({review}) => {
    const history = useHistory();
    const updateReview = review.review;
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const changeEdit = (e) => {
        e.preventDefault();
        history.push('/reviews/current');
        dispatch(thunkAUpdateReview(review))
        .then(closeModal)
    }

    return (
        <>
            <h1>How was your stay at</h1>
            <textarea
            placeholder='Lil Review'
            type='text'
            value={updateReview}
            />
            <div></div>
            <button onClick={changeEdit}>Update Your Review</button>
        </>
    );
}

export default EditReview;
