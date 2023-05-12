import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useModal, closeModal} from '../../context/Modal';
import { thunkCreateReview } from '../../store/reviewsReducer';
import { thunkASpot } from '../../store/spotsReducer';

const ReviewFormModal = ({ spot, disabled }) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState('');


    const createReview = async (e) => {
        const newReview = {
            spotId: spot.id,
            review,
            stars: rating
        }

        const resReview = await dispatch(thunkCreateReview(newReview));

        if(resReview.message) {
            setErrors(resReview.message)
        if(resReview.errors) {
            setErrors(resReview.errors.review)
        }
      } else {
        closeModal();
        dispatch(thunkASpot(spot.id))
      }
    }

    return(
        <>
            <div id="DeleteModal">
                <h2>How was your stay?</h2>
                {errors ? (<p className = 'errors'>{errors}</p>): null}
                <textarea
                    type="text"
                    value={review}
                    onChange={e=>{setReview(e.target.value)}}
                >
                </textarea>
                <ul className="Stars">
                    <div className={rating >=1 ? 'filled': 'empty'}>
                        <i className="fa-solid fa-star"
                        onMouseEnter={e=>setRating(1)}
                        onClick={e=>setRating(1)}
                        ></i>
                    </div>
                    <div className={rating >=2 ? 'filled': 'empty'}>
                        <i className="fa-solid fa-star"
                        onMouseEnter={e=>setRating(2)}
                        onClick={e=>setRating(2)}
                        ></i>
                    </div>
                    <div className={rating >=3 ? 'filled': 'empty'}>
                        <i className="fa-solid fa-star"
                        onMouseEnter={e=>setRating(3)}
                        onClick={e=>setRating(3)}
                        ></i>
                    </div>
                    <div className={rating >=4 ? 'filled': 'empty'}>
                        <i className="fa-solid fa-star"
                        onMouseEnter={e=>setRating(4)}
                        onClick={e=>setRating(4)}
                        ></i>
                    </div>
                    <div className={rating >=5 ? 'filled': 'empty'}>
                        <i className="fa-solid fa-star"
                        onMouseEnter={e=>setRating(5)}
                        onClick={e=>setRating(5)}
                        ></i>
                    </div>
                </ul>
                <div className="Create-Container-Button">
                    <button id="Create-Review" onClick={e => createReview()}>Submit your Review</button>
                </div>
            </div>
        </>
    )
}
export default ReviewFormModal;
