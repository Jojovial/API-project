import SpotForm from "../SpotForm";


const CreateASpot = () => {
    const spot = {
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        name: '',
        price: '',
        previewImage: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
    };

    return (
        <SpotForm
        spots={spot}
        formType='Create a new Spot'
        />
    );
};

export default CreateASpot;
