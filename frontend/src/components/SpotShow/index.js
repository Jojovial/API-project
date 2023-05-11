import { thunkASpot } from "../../store/spotsReducer";
import { thunkAllReviews } from "../../store/reviewsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './SpotShow.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const allReviews = useSelector(state => {
        console.log('state:', state.reviews);
        return state.reviews
    });
    console.log('All Reviews', allReviews)

    useEffect(() => {
        dispatch(thunkASpot(spotId))
        dispatch(thunkAllReviews(spotId))
    }, [dispatch, spotId]);

    console.log("spot",spot);

    if(!spot || !allReviews ) {
        return (
            <h2>Loading...</h2>
        )
    }


    console.log('After conditional', allReviews);
    return (
        <>
        <div id="Spot-Container">
            <h2 id="Spot-Name">{spot.name}</h2>
            <h4 id="Spot-Location">{spot.city}, {spot.state}, {spot.country}</h4>
         <div className="Photo-Gallery">
         {/* {typeof spot.SpotImages === 'string' && <li className="Main-Image"><img src={spot.SpotImages} alt={spot.name} /></li>} */}
         {Array.isArray(spot.SpotImages) && (
            <div className="First-Image">
                <img src={spot.SpotImages[0].url} alt={spot.SpotImages[0].altText}/>
                    </div>)}
         {Array.isArray(spot.SpotImages) && spot.SpotImages.map(image => (<li className="Other-Images"><img src={image.url} alt={image.altText}/></li>))}
                    </div>
        <div className="Spot-Info">
            <div className="Spot-Owner">
            {spot.Owner && (
             <h2>Wanted By : {spot.Owner.firstName} {spot.Owner.lastName}</h2>)}
                <p>{spot.description}</p>
            </div>
            <div className="Reservation">
                <p className="Price">{spot.price}</p>
                <p className="Reviews">{spot.numReviews}</p>
                <p className="Stars"><i className="fa-solid fa-star"></i>{spot.avgStarRating}</p>
                <button id="Reserve-Button">Reserve</button>
            </div>
         </div>
         <div className="Stars-Container">
            <h3><i className="fa-solid fa-star"></i>{spot.avgStarRating}</h3>
            <h3>{spot.numReviews}</h3>
         </div>
        <div className="Reviews-Container">
            <ul>

            {!(Object.values(allReviews)) ? <h2>Whatever</h2> : null}

            {Object.values(allReviews).map(review => {
                     console.log('review:', review);
                    return (
                         <li>
                        <h5>{review.createdAt.slice(0, 10)}</h5>
                        <p>{review.User.firstName}</p>
                        <p>{review.review}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
     </div>
    </>
    )
}

export default SpotShow;
