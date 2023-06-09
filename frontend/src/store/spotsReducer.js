import { csrfFetch } from "./csrf";

/* - Action Types - */
const GET_SPOTS = 'spots/getSpots';
const GET_USER_SPOTS = 'spots/getUserSpots';
const GET_A_SPOT = 'spots/getASpot';
const ADD_A_SPOT = 'spots/addASpot';
const ADD_SPOT_IMAGES = 'spots/addSpotImages'
const EDIT_A_SPOT = 'spots/editASpot';
const DELETE_A_SPOT = 'spots/deleteASpot';


/*- Action Creators - */

/*-Get All Spots-*/
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
};

/*-Get Current Spots of User-*/
export const getUserSpots = (userId) => {
    return {
        type: GET_USER_SPOTS,
        userId
    }
};


/*-Get A Spot-*/
export const getASpot = (spot) => {
    return {
        type: GET_A_SPOT,
        spot
    }
};

/*-Create A Spot-*/
export const addASpot = (spot) => {
    return {
        type: ADD_A_SPOT,
       spot
    }
}

/*-Spot Images-*/
export const addImages = (image, spotId) => {
    console.log("adding images thunk", image, spotId)
    return {
        type: ADD_SPOT_IMAGES,
        image,
        spotId
    }
}

/*-Edit A Spot-*/
export const editASpot = (spot) => {
    return {
        type: EDIT_A_SPOT,
        spot
    }
}

/*- Delete A Spot -*/
export const deleteASpot = (spotId) => {
    return {
        type: DELETE_A_SPOT,
        spotId
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

/*- Current Spots for User Thunkacalicious -*/
export const thunkAUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');



    if (res.ok) {
      const spots = await res.json();
      dispatch(getUserSpots(spots));
    }
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
        console.log("New spot", spotResponse);
        spotResponse.SpotImages = spot.SpotImages.forEach(image => {
            dispatch(thunkAImages(image, spotResponse.id));
        })
        return spotResponse;
    } catch(err) {
        console.log('before err',err);
      const errors = await err.json();
      console.log('after err',err);
      return errors;
    }
};

/*-Spot Image Thunk-*/
export const thunkAImages = (image, spotId) => async (dispatch) => {
    let res;
    try {
        res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(image)
        });
        const newImage = await res.json();
        console.log("Is this hitting the backend for newImage", newImage)
        dispatch(addImages(image, spotId))
        return newImage;
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
};

/*-Edit A Spot Thunk - */
export const thunkAEdit = (spotId, spot) => async (dispatch) => {
    console.log('thunk reached', spot);
    let res;
    try {
        res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
        });

        const spotToEdit = await res.json();
        console.log('before edit thunk gone through', spotToEdit);
        dispatch(editASpot(spotToEdit));
        console.log('after edit thunk gone through', spotToEdit);
        return spotToEdit
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
};

/*- Delete A Spot Thunk -*/
export const thunkADelete = (spotId) => async (dispatch, getState) => {
    let res;
    try {
        res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        });
        const deleteSpot = await res.json();
        dispatch(deleteASpot(spotId));
        return deleteSpot
    } catch (err) {
        const errors = await err.json();
        return errors;
    }
}

/* - Reducer(s) - */
const initialState = {
    allSpots: {},
    singleSpot: {},
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const newAllSpots = {};
            const spotsArr = action.spots.Spots;
            spotsArr.forEach(spot => {
                newAllSpots[spot.id] = spot;
            });
            return {
                ...state,
                allSpots: newAllSpots,
            };
        }
        case GET_USER_SPOTS: {
            console.log('GET USER SPOTS', action);
            const newAllSpots = {};
            console.log('action.userId:', action.userId);
            const spotsArr = action.userId.Spots;
            spotsArr.forEach(spot => {
                newAllSpots[spot.id] = spot;
            });
            return {
                ...state,
                allSpots: newAllSpots,
            };
        }
        case GET_A_SPOT: {
            const newSingleSpot = action.spot;
            console.log("GET_A_SPOT", newSingleSpot);
            return {
                ...state,
                singleSpot: newSingleSpot,
            };
        }
        case ADD_A_SPOT: {
            console.log('CREATE A SPOT ACTION', action);
            const createdSpot = action.spot;
            console.log('newSpot', action.spot);
            return {
                ...state,
                singleSpot: createdSpot

            };

        }
        case ADD_SPOT_IMAGES: {
            const spot = {...state.singleSpot}
            const newSpot = Object.values(spot)
            if (!newSpot[0].SpotImages instanceof Array) {
                newSpot[0].SpotImages.push(action.image)
            } else {
                newSpot[0].SpotImages = [action.image];
            }
            newSpot[newSpot.id] = newSpot;
            return {
                ...state,
                singleSpot: newSpot
            }
        }
        case EDIT_A_SPOT: {
            console.log('EDIT_A_SPOT', action.spot);
            const newSpot = {...state};
            const updatedSpot = action.spot;
            newSpot[updatedSpot.id] = updatedSpot;
            return {
              ...state,
              singleSpot: newSpot,
            };
        }
        case DELETE_A_SPOT: {
           const newSpot = {...state.allSpots};
           delete newSpot[action.spotId];
           return {
            ...state,
            allSpots: newSpot
           }
        }
        default:
            return state;
    }
};

export default spotsReducer;
