import { thunkASpot } from "../../store/spotsReducer";
import { thunkAllReviews, clearReviews } from "../../store/reviewsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './SpotShow.css';
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal";

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const spot = useSelector(state => state.spots.singleSpot);
    const allReviews = useSelector(state => {
        console.log('state:', state.reviews);
        return state.reviews
    });
    const hasReviewed = Array.isArray(allReviews) && allReviews.find(review => review.userId === userId);

    console.log('All Reviews', allReviews)

    useEffect(() => {
        dispatch(thunkASpot(spotId))
        dispatch(clearReviews())
        dispatch(thunkAllReviews(spotId))
    }, [dispatch, spotId]);

    console.log("spot",spot);;

    // const deleteReview = async (reviewId) => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    //     if (confirmDelete) {
    //         await dispatch(thunkADeleteReview(reviewId))
    //         dispatch(thunkAllReviews(spotId));
    //     }
    // }

    if(!spot || !allReviews ) {
        return (
            <h2>Loading...</h2>
        )
    }


    console.log('After conditional', allReviews);


    const stars = (
      <div className="Stars-Container">
          <i className="fa-solid fa-star"></i>
          <span>{spot && spot.avgStarRating && spot.avgStarRating}</span>

      </div>
    );

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
                <p className="Price">${spot.price}</p>
                <p className="Reviews">{spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}</p>
                <p className="Stars"> {stars}</p>
                <button id="Reserve-Button" onClick={() => window.alert("Feature coming soon")}>Reserve</button>
            </div>
         </div>
         <div className="Stars-Container">
            <h3>{stars}</h3>
            <h3>{spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}</h3>
         </div>
         <div className="Reviews-Container">
         {userId && !hasReviewed ? (
  <OpenModalButton
    className="Review-Button custom-button"
    buttonText="Post Your Review"
    modalComponent={<ReviewFormModal spot={spot} onReviewCreated />}
    />
  ) : null}
  {Object.values(allReviews).length > 0 ? (
        <ul>
            {Object.values(allReviews).reverse().map((review) => {
                if (!review.User) {
                    console.log('review.User', review.User);
                    return (
                        <div key={review}>
                            <h5>
                                {review.createdAt.slice(5, 10)}-{review.createdAt.slice(0, 4)}
                            </h5>
                            <p>{review.review}</p>
                            {review.User ? (
                                <h2>{review.User.firstName}</h2>
                            ) : (
                                <button>Oh</button>
                            )}
                        </div>
                    );
                } else {
                    return (
                        <li key={review.id}>
                            <h5>
                                {review.createdAt.slice(5, 10)}-{review.createdAt.slice(0, 4)}
                            </h5>
                            <p>{review.User.firstName}</p>
                            <p>{review.review}</p>
                            {review.userId === userId ? (
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={
                                        <DeleteReviewModal
                                            reviewId={review.id}
                                            spotId={review.spotId}
                                            className="delete-button"
                                        />
                                    }
                                />
                            ) : null}
                        </li>
                    );
                }
            })}
        </ul>
    ) : userId && spot.Owner?.id !== userId ? (
        <p>Be the first to post a review!</p>
    ) : null}
</div>

     </div>
     </>
     )
  }

export default SpotShow;
