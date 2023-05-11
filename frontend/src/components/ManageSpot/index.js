import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkAUser } from '../../store/spotsReducer';
import DeleteASpot from '../DeleteASpot';
import OpenModalButton from '../OpenModalButton';

const CurrentUserSpots = () => {
    const dispatch = useDispatch();
    const currentSpots = useSelector(state =>  state.spots.allSpots);

    useEffect(() => {
        dispatch(thunkAUser())
    }, [dispatch]);

    if(!currentSpots) return (
        <h3>Loading Beep Boop..</h3>
    );




    return (
        <>
            <h1>Manage your spots or else</h1>
            <Link exact to="/spots/new">
                <button>Create New Spot</button>
            </Link>
            <div id="Spots-Container">
            {Object.values(currentSpots).map((spot) => {
                return (
                    <>
                        <div key={spot.id} id="Spot">
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
                                <OpenModalButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteASpot spotId={spot.id} />}
                                />
                            </div>
                    </>
                )
            })}
            </div>

        </>
    )
};


export default CurrentUserSpots;
