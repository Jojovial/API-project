import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkACurrentReviews } from '../../store/reviewsReducer';
import OpenModalButton from '../OpenModalButton';
import EditReview from '../EditReview';
import DeleteReviewModal from '../DeleteReviewModal';

const CurrentReviews = () => {
    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.reviews.user);
    console.log('Current Reviews', userReviews)

    useEffect(() => {
        dispatch(thunkACurrentReviews())
    }, [dispatch]);

    if(!userReviews) return <h2>I do be loading</h2>

    return (
        <div>
            <h2>Manage your Reviews</h2>
            <ul>
                {Object.values(userReviews).map(review => {
                    return (
                        <div key={review.id}>
                            <h3>{review.Spot.name}</h3>
                            <p>{review.updatedAt.slice(0,10)}</p>
                            <p>{review.review}</p>
                         <div>
                            <OpenModalButton
                            buttonText='Update'
                            modalComponent={<EditReview review={review}/>}
                            />
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReviewModal reviewId={review}/>}
                            />
                         </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default CurrentReviews;
