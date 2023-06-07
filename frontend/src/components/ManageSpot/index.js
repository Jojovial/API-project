import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkAUser } from '../../store/spotsReducer';
import DeleteASpot from '../DeleteASpot';
import OpenModalButton from '../OpenModalButton';
import './ManageSpot.css';

const CurrentUserSpots = () => {
    const dispatch = useDispatch();
    const currentSpots = useSelector(state =>  state.spots.allSpots);
    console.log('Current Spots', currentSpots);
    useEffect(() => {
        dispatch(thunkAUser())
    }, [dispatch]);

    if(!currentSpots) return (
        <h3>Loading Beep Boop..</h3>
    );

    if (currentSpots.length === 0) {
        return (
          <>
            <h1>No spots yet!</h1>
            <Link to="/spots/new">
              <button className="Create-Button">Create New Spot</button>
            </Link>
          </>
        );
      }



    return (
        <>
            <div className ="Current-Header">
            <h1>Manage your spots or else</h1>
            {currentSpots.length === 0 && (
          <Link exact to="/spots/new">
            <button className="Create-Button">Create New Spot</button>
          </Link>
             )}
            </div>
            <div id="SpotsContainer">
            {Object.values(currentSpots).map((spot) => {
                return (
                    <>

                        <Link to={`/spots/${spot.id}`}>
                        <div key={spot.id} id="spot" className='Current-Spots'>
                            <img
                            src={spot.previewImage}
                            id="SpotImage"
                            alt={spot.name}
                            >
                            </img>
                            <div className="Current-Spots-Info">
                            <p className="Spot-Info" id="Spot-Location">
                            {spot.city}, {spot.state}
                             </p>
                            <p className="Spot-Info" id="Spot-Rating">
                            {spot.avgRating}
                            </p>

                            <p className="Spot-Info" id="Spot-Price">
                             ${spot.price} per visit
                            </p>

                            <div className="Update-Delete">
                                <Link exact to={`/spots/${spot.id}/edit`}>Update</Link>
                                <OpenModalButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteASpot spotId={spot.id} />}
                                        />
                                      </div>
                                </div>
                            </div>
                            </Link>

                    </>
                )
            })}
            </div>

        </>
    )
};


export default CurrentUserSpots;
