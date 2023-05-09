import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkACreate } from "../../store/spotsReducer";

const SpotForm = ({ spot, formType }) => {
    const history = useHistory();
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [image2, setImage2] = useState(spot?.image2);
    const [image3, setImage3] = useState(spot?.image3);
    const [image4, setImage4] = useState(spot?.image4);
    const [image5, setImage5] = useState(spot?.image5);
    const [errors, setErrors] = useState({});
}
