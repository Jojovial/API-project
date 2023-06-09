import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'spots/getAllReviews';
const GET_CURRENT_USER_REVIEWS = '/spots/getCurrentUserReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_A_REVIEW = '/reviews/deleteReview';
const CLEAR_REVIEWS = '/reviews/clearReviews';



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
        type: CREATE_REVIEW,
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

/*- Clear Reviews -*/
export const clearReviews = () => {
    return {
        type: CLEAR_REVIEWS
    }
};

/*- Thunks -*/

/*- All Reviews Thunk -*/
export const thunkAllReviews = (spotId) => async (dispatch) => {
    let res;
    try {
      res = await csrfFetch(`/api/spots/${spotId}/reviews`);
      const allReviews = await res.json();
      dispatch(getAllReviews(allReviews));
    } catch (err) {
      console.error(err);
    }
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
        res = await csrfFetch(`/api/spots/${newReview.spotId}/reviews`, {
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
    let newState = {};
    console.log('made it into reducer', action)
    switch(action.type) {
        case GET_ALL_REVIEWS:
    const newReview = {};
    const reviews = action.reviews.Reviews;
    console.log('GET_ALL_REVIEWS', reviews);
    if (reviews && reviews.length > 0) {
        reviews.forEach(review => {
            newReview[review.id] = review;
        });
    } else {
        newReview[action.reviews.SpotId] = {};
    }
    console.log('NEW REVIEW', newReview);
    return {...state, ...newReview};
        case CREATE_REVIEW:
            return {...state, [action.newReview.id]: action.newReview}
        case DELETE_A_REVIEW:
            newState = {...state};
            delete newState[action.reviewId];
            return newState;
        case CLEAR_REVIEWS:
            return {};
         default:
                return state;

    }
};

export default reviewsReducer;
