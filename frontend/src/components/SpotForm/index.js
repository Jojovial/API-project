import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkACreate } from "../../store/spotsReducer";


const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot?.address || '');
    const [city, setCity] = useState(spot?.city || '');
    const [statePlace, setStatePlace] = useState(spot?.state || '');
    const [country, setCountry] = useState(spot?.country || '');
    const [name, setName] = useState(spot?.name || '');
    const [description, setDescription] = useState(spot?.description || '');
    const [price, setPrice] = useState(spot?.price || '');
    const [previewImage, setPreviewImage] = useState(spot?.previewImage || '');
    const [image2, setImage2] = useState(spot?.image2 || '');
    const [image3, setImage3] = useState(spot?.image3 || '');
    const [image4, setImage4] = useState(spot?.image4 || '');
    const [image5, setImage5] = useState(spot?.image5 || '');
    const [errors, setErrors] = useState({});


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        spot = {
            ...spot,
            country,
            address,
            city,
            state: statePlace,
            description,
            name,
            price,
            previewImage,
            image2,
            image3,
            image4,
            image5
        };

        if(formType === 'Update your Spot') {
        } else if (formType === 'Create a new Spot'){
        const newSpot = await dispatch(thunkACreate(spot));
            spot = newSpot
        }

        if(spot.errors) {
            setErrors(spot.errors)
        } else {
            history.push(`/spots/${spot.id}`);
        }

    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <label>
                Country:
                <div className="errors">{errors.country}</div>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                />
            </label>
            <label>
                Street Address:
                <div className="errors">{errors.address}</div>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address"
                />
            </label>
            <label>
                City:
                <div className="errors">{errors.city}</div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
            </label>
            <label>
                State:
                <div className="errors">{errors.state}</div>
                <input
                    type="text"
                    value={statePlace}
                    onChange={(e) => setStatePlace(e.target.value)}
                    placeholder="State"
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <div className="errors">{errors.description}</div>
            </label>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <div className="errors">{errors.name}</div>
            </label>
            <label>
                Price:
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price per visit"
                />
                <div className="errors">{errors.price}</div>
            </label>
            <label>
                Please submit at least one photo
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder="Preview Image Url"
                />
                {!previewImage ? <div className="errors">Preview image is required</div>: null}
                {/* {previewImage.includes('jpg' || 'png' || 'jpeg') ? null: <div className="errors">Image URL must be valid type. </div>} */}
                <input
                    type="text"
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image3}
                    onChange={(e) => setImage3(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image4}
                    onChange={(e) => setImage4(e.target.value)}
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    value={image5}
                    onChange={(e) => setImage5(e.target.value)}
                    placeholder="Image URL"
                />
            </label>
            <button type="submit">Create Spot</button>
        </form>
        </>
    );
}

export default SpotForm;
