import { thunkAllSpots } from "../../store/spotsReducer";
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Spots.css';
const SpotsIndex = () => {
    const [previewImage, setPreviewImage] = useState(false);
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => {
      return state.spots.allSpots
    });

    useEffect(() => {
      dispatch(thunkAllSpots());
    }, [dispatch]);

    const handlePreviewImage = () => {
      setPreviewImage(true);
    }



    if (!spotsObj) {
        return <h2>Loading...</h2>;
      }
      const spots = Object.values(spotsObj);
      console.log("here is spots",spots);
      return (
        <>
      <div id="Spots-Container">
        {spots.map((spot) => {
          console.log(spot);
          const starRating = spot.avgRating && spot.avgRating > 0 ? (
            <>
              {spot.avgRating.toFixed(1)}
              <i className="fa-solid fa-star"></i>
            </>
          ) : (
            "New"
          );
          return (
            <div key={spot.id} id="Spots" title={spot.name}>
              <Link exact to={`/spots/${spot.id}`}>
              {!previewImage && <div className="placeholder-image" />}
              <img
                src={spot.previewImage}
                id="Spot-Image"
                alt="Spot"
                onLoad={handlePreviewImage}
                style={{ display: setPreviewImage ? "block" : "none" }}
              ></img>
              </Link>
              <div id="Top">
                <p className="Spot-Info" id="Spot-Location">
                  {spot.city}, {spot.state}
                </p>
                <p className="Spot-Info" id="Spot-Rating">
                {starRating}
                </p>
              </div>
              <p className="Spot-Info" id="Spot-Price">
                ${spot.price} per visit
              </p>

            </div>
          );
        })}
      </div>
    </>
  );
};
export default SpotsIndex;
