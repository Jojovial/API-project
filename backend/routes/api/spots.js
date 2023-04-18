const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

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

    res.json(thisSpot);
})



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

/*-Create an Image For a Spot*/



/*-Edit A Spot-*/

/*-Delete A Spot-*/






/*-Do Not Touch-*/
module.exports = router;
