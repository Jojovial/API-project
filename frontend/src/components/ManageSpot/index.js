import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkAUser } from '../../store/spotsReducer';

const CurrentUserSpots = () => {
    const dispatch = useDispatch();
    const userSpotsObj = useSelector(state => state.spots.userSpots);


    useEffect(() => {
        dispatch(thunkAUser())
    }, [dispatch]);

    if(!userSpotsObj) return (
        <h3>Loading Beep Boop..</h3>
    );


    const spots = Object.values(userSpotsObj);

    if(!spots.length) return (
        <h3>You have no spots! </h3>
    )

    return (
        <>
            <h1>Manage your spots or else</h1>
            <Link exact to="/spots/new">
                <button>Create New Spot</button>
            </Link>
            <div id="Spots-Container">
            {spots.map((spot) => {
                return (
                    <>
                        <div id="Spot">
                            <img
                            src={spot.previewImage}
                            id="Spot-Image"
                            alt={spot.name}
                            >
                            </img>
                            <div id="Top">
                                <p className="Spot-Info" id="Spot-Location">{spot.city}, {spot.state}</p>
                                <p className="Spot-Info" id="Spot-Rating">{spot.avgRating}</p>
                            </div>
                                <Link exact to={`/spots/${spot.id}/edit`}>Update</Link>
                                {/*Delete Button Here*/}
                            </div>
                    </>
                )
            })}
            </div>

        </>
    )
};


export default CurrentUserSpots;
