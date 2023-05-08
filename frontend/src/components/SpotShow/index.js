import { thunkASpot } from "../../store/spotsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './SpotShow.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(thunkASpot(spotId))
    }, [dispatch]);

    if(!spot) {
        return (
            <h2>Loading...</h2>
        )
    }
    return (
        <>
        <div id="Spot-Container">
            <h2 id="Spot-Name">{spot.name}</h2>
            <h4 id="Spot-Location">{spot.city}, {spot.state}, {spot.country}</h4>
         <div className="Photo-Gallery">
         {Array.isArray(spot.SpotImages) && spot.SpotImages.map(image => (<img src={image.url} alt={image.altText} key={image.id} />))}
         </div>
         <div className="Spot-Info">
            <div className="Description">
                <h2>Wanted By : {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                <p>{spot.description}</p>
            </div>
            <div className="Reservation">
                <p>{spot.price}</p>
                <p>{spot.numReviews}</p>
                <p>{spot.avgStarRating}</p>
                <button id="Reserve-Button">Reserve</button>
            </div>
         </div>
     </div>
    </>
    )
}

export default SpotShow;
