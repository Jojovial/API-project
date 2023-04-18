const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

/*-Get Spots of Current User-*/
router.get('/current', async (req, res, next) => {

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




/*-Do Not Touch-*/
module.exports = router;
