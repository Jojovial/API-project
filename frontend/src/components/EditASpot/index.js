import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkASpot } from "../../store/spotsReducer";
import SpotForm from "../SpotForm";

const EditASpot = () => {
    const { spotId } = useParams();
    console.log('here is spotId', spotId);
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    console.log('spot gottem', spot);
    useEffect(() => {
        dispatch(thunkASpot(spotId))
    }, [dispatch, spotId]);

    if(!spot){
        return <h3>Oopsie no Spot found.</h3>
    }

 return (

    <SpotForm
    spot={spot}
    formType='Update your Spot'
    />

 );

};

export default EditASpot;
