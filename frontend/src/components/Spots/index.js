import { thunkAllSpots } from "../../store/spotsReducer";
import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Spots.css';
const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);

    useEffect(() => {
      dispatch(thunkAllSpots());
    }, [dispatch]);



    if (!spotsObj) {
        return <h2>Loading...</h2>;
      }
      const spots = Object.values(spotsObj);
      return (
        <>
      <div id="Spots-Container">
        {spots.map((spot) => {
          console.log(spot);
          return (
            <div key={spot.id} id="Spots">
              <img
                src="/skypiea.png"
                id="Spot-Image"
                alt="Spot"
              ></img>
              <div id="Top">
                <p className="Spot-Info" id="Spot-Location">
                  {spot.city}, {spot.state}
                </p>
                <p className="Spot-Info" id="Spot-Rating">
                  {spot.avgRating}
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
