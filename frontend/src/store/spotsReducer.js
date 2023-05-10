import { csrfFetch } from "./csrf";

/* - Action Types - */
const GET_SPOTS = 'spots/getSpots';
const GET_A_SPOT = 'spots/getASpot';
const ADD_A_SPOT = 'spots/addASpot';
const EDIT_A_SPOT = 'spots/editASpot';

/*- Action Creators - */

/*-Get All Spots-*/
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

/*-Get A Spot-*/
export const getASpot = (spot) => {
    return {
        type: GET_A_SPOT,
        currentSpot: spot
    }
};

/*-Create A Spot-*/
export const addASpot = (spot) => {
    return {
        type: ADD_A_SPOT,
        newSpot : spot
    }
}

/*-Edit A Spot-*/
export const editASpot = (spot) => {
    return {
        type: EDIT_A_SPOT,
        spot
    }
}

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
    console.log('single spot gottem from thunk', spot);
};

/*- Create A Spot Thunk - */
export const thunkACreate = (spot) => async (dispatch) => {
    let res;
    try {
        res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(spot)
        });
        console.log("where is poop town",res)
        const spotResponse = await res.json();
        dispatch(addASpot(spotResponse));
        return spotResponse;
    } catch(err) {
      const errors = await err.json();
      return errors;
    }
};

/*-Edit A Spot Thunk - */
export const thunkAEdit = (spot) => async (dispatch) => {
    console.log('thunk reached', spot);
    let res;
    try {
        res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });

        const spotToEdit = await res.json();
        console.log('after edit thunk gone through', spotToEdit);
        dispatch(editASpot(spotToEdit));
        return spotToEdit
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
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
            return {...state, currentSpot: action.currentSpot};
        case ADD_A_SPOT:
            console.log("CREATE A SPOT ACTION",action)
            return {...state, [action.newSpot.id]: action.newSpot};
        case EDIT_A_SPOT:
            console.log('EDIT_A_SPOT', action.spot);
            return {...state, [action.spot.id]: {...state[action.spot.id], ...action.spot}};
        default:
            return state;
    }
}

export default spotsReducer;
