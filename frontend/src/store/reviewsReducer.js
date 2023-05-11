import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'spots/getAllReviews';
const GET_CURRENT_USER_REVIEWS = '/spots/getCurrentUserReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_A_REVIEW = '/reviews/deleteReview';


/*-Action Creators -*/


/*- Get All Reviews for Spot -*/
export const getAllReviews = (reviews) => {
    console.log('action reviews', reviews);
    return {
        type: GET_ALL_REVIEWS,
        reviews
    };
};

/*- Get Current User Reviews-*/
export const getCurrentUserReviews = (review) => {
    return {
        type: GET_CURRENT_USER_REVIEWS,
        review
    };
};

/*-Create A Review -*/
export const createAReview = (newReview) => {
    return {
        type: ADD_REVIEW,
        newReview
    };
};

/*-Delete A Review -*/
export const deleteAReview = (reviewId) => {
    return {
        type: DELETE_A_REVIEW,
        reviewId
    }
};

/*- Thunks -*/

/*- All Reviews Thunk -*/
export const thunkAllReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response.json();
    dispatch(getAllReviews(reviews));
    console.log('all reviews thunka', reviews);
};

/*- Current User Reviews Thunk -*/
export const thunkACurrentReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    const review = await response.json();
    dispatch(getCurrentUserReviews(review));
};

/*- Add a Review Thunk -*/
export const thunkCreateReview = (newReview) => async (dispatch) => {
    let res;
    try {
        res = await csrfFetch(`/api/spots${newReview.spotId}/reviews`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newReview)
        });
        const resReview = await res.json();
        dispatch(createAReview(resReview));
        return resReview;
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
};

/*- Delete a Review ThunkHunk -*/
export const thunkADeleteReview = (reviewId) => async (dispatch, getState) => {
    let res;
    try {
        res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        });
        const deleteReview = await res.json();
        dispatch(deleteAReview(reviewId));
        return deleteReview
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
};

/*- Review Reducer -*/
const reviewsReducer = (state = {}, action) => {
    console.log('made it into reducer', action)
    switch(action.type) {
        case GET_ALL_REVIEWS:
            console.log('part booty', action);
            const newReview = {};
            const reviews = action.reviews.Reviews;
            console.log('GET_ALL_REVIEWS', reviews);
            reviews.forEach(review => {
                newReview[review.id] = review
            });
            console.log('NEW REVIEW', newReview);
            return newReview;
            default:
                return state;
    }
};

export default reviewsReducer;
