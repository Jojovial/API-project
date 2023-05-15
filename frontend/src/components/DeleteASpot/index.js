import React, {useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkADelete } from '../../store/spotsReducer';
import { useModal } from '../../context/Modal';
import './DeleteASpot.css'

const DeleteASpot = ({ spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault();
        history.push('/spots/current');
        dispatch(thunkADelete(spotId))
        .then(closeModal)
    }

    return(
        <>
        <h1>Delete?</h1>
         <p>Are you sure you want to remove this spot?</p>
            <button className="DeleteASpot-Button" onClick={handleDelete}>Yes: Bye Bye Spot</button>
        <Link exact to={'/spots/current'}>
            <button className="No-DeleteASpot-Button"onClick={closeModal}>No</button>
        </Link>
        </>
    )
};

export default DeleteASpot;
