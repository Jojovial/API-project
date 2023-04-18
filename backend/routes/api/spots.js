const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

/*-Get All the Spots-*/
router.get('/', async (req, res, next) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: Review,
                as: 'avgRating',
                attributes: ['stars']
            },
            {
                model: SpotImage
            }
        ]
    })
    /*--*/
    let spotsList = [];

    allSpots.forEach(spot => {
        spotsList.push(spot.toJSON());
    });
    
    spotsList.forEach(spot => {
        let total = 0;
        let length = spot.avgRating.length
        spot.avgRating.forEach(rating => {
            total += rating.stars
        })
        spot.avgRating = total/length
        if(!spot.avgRating) {
            spot.avgRating = 'No rating!'
        }
    });

    res.json(spotsList);


});



/*-Do Not Touch-*/
module.exports = router;
