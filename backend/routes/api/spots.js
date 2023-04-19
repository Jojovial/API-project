const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

/*-Spot Validator-*/
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Invalid latitude'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Invalid longtitude'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 70 })
    .withMessage('Name cannot be more than 70 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('A description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('A price is required'),
  handleValidationErrors
];

/*-Get Spots of Current User-*/
router.get('/current', requireAuth, async (req, res) => {
 const { user } = req;
 const currentUser = await Spot.findAll({
    where:{
        ownerId: user.id
    }
 })
 res.json({ Spots: currentUser })
});

/*-Get Details of Spot by Id*/
router.get('/:spotId', async (req, res, next) =>{
    const thisSpot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: User},//somehow make as Owners
            { model: SpotImage }
        ],
    })

    res.status(200).json(thisSpot);
});



/*-Get All the Spots-*/
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll();
    const spotImages = await SpotImage.findAll();
    const rating = await Review.findAll();

    const spotsObj = {Spots:[]}

    /*-Image Preview?-*/
    for (let spot of spots) {
        spot = spot.toJSON();
        for(let spotImage of spotImages) {
            if(spotImage.spotId === spot.id){
               spot.previewImage = spotImage.url
            }
        }

    /*-Calculate Average Rating-*/
    let sum = 0;
    let count = 0;
    for(let review of rating) {
        review = review.toJSON();
        console.log(review);
        if(review.spotId === spot.id){
            sum = sum + review.stars;
            count++;
        }
    }

    const avg = sum/count
    spot.avgRating = avg;
    spotsObj.Spots.push(spot);

 }
    res.status(200).json(spotsObj);


});

/*-Create A Spot-*/
router.post('/', requireAuth, validateSpot, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req;
    const newSpot = await Spot.create({
        ownerId: user.id,//must be unique? but is? maybe take out
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201).json(newSpot);
});

/*-Create an Image For a Spot*/
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const aSpot = await Spot.findByPk(req.params.spotId)

    if(!aSpot){
     res.status(404).json({ message : 'No Spot Found'});
     return next(err)
    }

    const { url, preview } = req.body;

    const newImage = await SpotImage.create({
        spotId: parseInt(req.params.spotId),
        url,
        preview
    });
    //remember the constraints you took out and ask because huh
    //allowNull: false, i guess it makes sense but why
    //it let me submit a binary file but idk if that's what we're supposed to do

    res.status(201).json(newImage);
});


/*-Edit A Spot-*/

/*-Delete A Spot-*/






/*-Do Not Touch-*/
module.exports = router;
