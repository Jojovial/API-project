import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = 'spots/getAllReviews';
const GET_CURRENT_USER_REVIEWS = '/spots/getCurrentUserReviews';
const CREATE_REVIEW = 'reviews/createReview';
const DELETE_A_REVIEW = '/reviews/deleteReview';
const CLEAR_REVIEWS = '/reviews/clearReviews';
const UPDATE_REVIEW = '/review/updateReview';




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
export const getCurrentUserReviews = (reviews) => {
    return {
        type: GET_CURRENT_USER_REVIEWS,
        reviews
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

/*-Update Review-*/
const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

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
    let res;
    try {

        res = await csrfFetch('/api/reviews/current');
        const reviews = await res.json();
        dispatch(getCurrentUserReviews(reviews));
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
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
        console.log('New Review Thunk', resReview)
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

/*-Update Review Thunk-*/
export const thunkAUpdateReview = (review) => async (dispatch) => {
    let res;
    try {
        res = await csrfFetch(`/api/reviews/${review.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        const update = await res.json();
        dispatch(updateReview(update))
    } catch(err) {
        const errors = await err.json();
        return errors;
    }
}

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
    case GET_CURRENT_USER_REVIEWS:
    const newCurrentUserReviews = {};
    const currentUserReviews = action.reviews.Reviews;
    console.log('GET_CURRENT_USER_REVIEWS', currentUserReviews);
    if (currentUserReviews && currentUserReviews.length > 0) {
      currentUserReviews.forEach((review) => {
        newCurrentUserReviews[review.id] = review;
      });
    } else {
      newCurrentUserReviews[action.reviews.SpotId] = {};
    }
    console.log('NEW CURRENT USER REVIEWS', newCurrentUserReviews);
    return { ...state, ...newCurrentUserReviews };
        case CREATE_REVIEW:
            return {...state, [action.newReview.id]: action.newReview};
        case UPDATE_REVIEW:
            return {...state, [action.review.id]: action.review};
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
