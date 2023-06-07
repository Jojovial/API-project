import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkACreate, thunkAEdit } from "../../store/spotsReducer";
import "./SportForm.css";

const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [statePlace, setStatePlace] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [errors, setErrors] = useState({});
    const [editedSpot, setEditedSpot] = useState(spot);

    useEffect(() => {
      if (spot) {
        setAddress(spot.address || "");
        setCity(spot.city || "");
        setStatePlace(spot.state || "");
        setCountry(spot.country || "");
        setName(spot.name || "");
        setDescription(spot.description || "");
        setPrice(spot.price || "");
        setPreviewImage(spot.previewImage || "");
        setImage2(spot.image2 || "");
        setImage3(spot.image3 || "");
        setImage4(spot.image4 || "");
        setImage5(spot.image5 || "");
      }
    }, [spot]);


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
         const err = {};

         spot = {
          ...spot,
          country,
          address,
          city,
          state: statePlace,
          description,
          name,
          price,
          SpotImages: [
            {
              url: previewImage,
              preview: true
            },
            {
              url: image2,
              preview: true
            },
            {
              url: image3,
              preview: true
            },
            {
              url: image4,
              preview: true
            },
            {
              url: image5,
              preview: true
            }
          ]
        };
        if (formType === "Update your Spot") {
          const editedSpot = await dispatch(thunkAEdit(spot.id, spot));
          if (editedSpot.errors) {
            setErrors(editedSpot.errors);
          } else {
            setEditedSpot(editedSpot);
            history.push(`/spots/${editedSpot.id}`);
          }
        } else if (formType === "Create a new Spot") {
          const newSpot = await dispatch(thunkACreate(spot));
          if (newSpot.errors) {
            setErrors(newSpot.errors);
          } else {
            setEditedSpot(newSpot);
            history.push(`/spots/${newSpot.id}`);
          }
        }

        if(!previewImage) {
          err.previewImage = "Preview image is required"
        }
      };

    return(
        <>
        <div className="Form-Container">
        <form className="form spot-form" onSubmit={onSubmit}>
            <h3>Where is your place located?</h3>
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
            <h3>Describe your place to guests!</h3>
            <label>
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
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
                {!previewImage.includes("jpg") && !previewImage.includes("png") && !previewImage.includes("jpeg") ?
                <div className="errors">Preview Image URL must be a valid image type</div> : null}
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
            <button type="submit">
            {formType === "Create a new Spot" ? "Create your spot" : "Update your spot"}
            </button>
        </form>
        </div>
        </>
    );
}

export default SpotForm;
