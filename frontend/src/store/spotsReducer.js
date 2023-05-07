import { csrfFetch } from "./csrf";

/* - Action Types - */
const GET_SPOTS = 'spots/getSpots';
const GET_A_SPOT = 'spots/getASpot';

/*- Action Creators - */

/*-Get All Spots-*/
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

/*-Get A Spot-*/
export const getASpot = (spots) => {
    return {
        type: GET_A_SPOT,
        spots
    }
};

/* - Thunks - */

/*- All Spots Thunk - */
export const thunkAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    const spots = await response.json();
    console.log("after response", spots);
    dispatch(getSpots(spots));
};

/*- A Spot Thunk - */
export const thunkASpot = (spotId) => async (dispatch, getState) => {
    const response = await fetch(`/api/spots/${spotId}`);
    const spot = await response.json();
    dispatch(getASpot(spot));
}

/* - Reducer(s) - */
const initialState = {};
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = {};
            const spotsArr = action.spots.Spots;
            spotsArr.forEach(spot => {
               newState[spot.id] = spot;
            });
            return {...state, ...newState};
        case GET_A_SPOT:
            return {...state, [action.spot.id]: action.spot};
        default:
            return state;
    }
}

export default spotsReducer;
