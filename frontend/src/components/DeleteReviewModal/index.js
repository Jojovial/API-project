import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkADeleteReview } from "../../store/reviewsReducer";
import { thunkASpot } from "../../store/spotsReducer";
const DeleteReviewModal = ({ reviewId, spotId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const YesToDelete = () => {
        dispatch(thunkADeleteReview(reviewId));
        dispatch(thunkASpot(spotId));
        history.push(`/spots/${spotId}`);
        closeModal();
    }

    const NoToDelete = () => {
        closeModal();
    }

    return (
        <div className="Delete-Review-Modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you wish to delete this review?</p>
            <div className="Delete-Review-Buttons">
                <button onClick={YesToDelete} className="Delete-Review-Button">Yes(Bye Bye Review)</button>
                <button onClick={NoToDelete} className="No-Delete-Review-Button">No (Yay Keep Review)</button>
            </div>
        </div>
    )

}

export default DeleteReviewModal;
