const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

/*-Spot Validator-*/
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .isLength({min: 5, max: 150})
    .withMessage('Address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .isLength({min: 1, max: 50 })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .isAlpha()
    .isLength({ min: 1, max: 25})
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage('Invalid latitude'),
  check('lng')
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage('Invalid longtitude'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 70 })
    .withMessage('Name cannot be more than 70 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({ min:5, max:500 })
    .withMessage('A description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('A price is required'),
  handleValidationErrors
];

/*-Review-Validator-*/
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 5, max: 500 })
    .withMessage('Review text is required.'),
  check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

/*-Bookings-Validator-*/
//maybe

/*-Get All Bookings for a Spot By Id -*/
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const currentUserId = req.user.id;
    const thisSpotId = req.params.spotId;

    const spot = await Spot.findByPk(thisSpotId);
    if(!spot) {
      return res.status(404).json({ message: 'Spot could not be found.'});
    }

    let userBookings;

    if(currentUserId !== spot.ownerId) {
      userBookings = await Booking.findAll({
        where: {
          spotId: thisSpotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
      });
    }

    if(currentUserId === spot.ownerId) {
      userBookings = await Booking.findAll({
        where: {
          spotId: thisSpotId
        },
        include: {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }

      });
    }

    const result = {Bookings: userBookings}
    res.status(200).json(result);
});

/*-Get Review by SpotId-*/
router.get('/:spotId/reviews', async (req, res) => {
  try {
    const { spotId } = req.params;

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage }
      ]
    });

    if(reviews.length === 0) {
      return res.status(404).json({ message: 'Spot could not be found or has no reviews.'});
    }

    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

/*-Get Spots of Current User-*/
router.get('/current', requireAuth, async (req, res) => {
  const user = req.user.id;
  const currentSpots = await Spot.findAll({
    where: {
      ownerId: user
    }
   });
  const reviews = await Review.findAll();
  const images = await SpotImage.findAll();
  const result = {Spots: []};
  /*-Average Rating-*/
  for(let spot of currentSpots) {
    spot = spot.toJSON();
    let total = 0;
    let length = 0;
    for(let review of reviews) {
      review = review.toJSON();
      if(spot.id === review.spotId) {
        total += review.stars;
        length++;
      }
    }
    /*-Image Preview-*/
    let imageArray = [];
    for (let image of images) {
      image = image.toJSON();
      if(spot.id === image.spotId) {
        imageArray.push(image.url);
      }
    }
    /*-Reassigning-*/
    spot.avgStarRating = total / length;
    spot.previewImages = imageArray;
    if(!spot.avgRating) {
      spot.avgRating = 'Has no ratings :('
    }
    if(!spot.previewImages.length) {
      spot.previewImages = 'No images'
    }
    result.Spots.push(spot);
  }
  res.status(200).json(result);
});

/*-Get Details of Spot by Id*/
router.get('/:spotId', async (req, res, next) =>{
    const spotId = req.params.spotId;
    let thisSpot = await Spot.findByPk(spotId);
    if(!thisSpot) {
      return res.status(404).json({ message: "Spot could not be found"});
    }

    let aUser = await User.findByPk(thisSpot.ownerId, {
      attributes: {
        exclude: ['username']
      }
    });
    let reviews = await Review.findAll();
    let images = await SpotImage.findByPk(spotId, {
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt']
      }
    });
    /*-Avarage Rating-*/
    thisSpot = thisSpot.toJSON();
    let total = 0;
    let length = 0;
    for (let review of reviews) {
        review = review.toJSON();
        if(thisSpot.id === review.spotId) {
          total += review.stars;
          length++;
        }
    }
    /*-Images-*/
    let imageArray = [];
    if(images.length > 1) {
    for(let image of images) {
      image = image.toJSON();
      imageArray.push(image)
    }
  } else {
    images = images.toJSON();
    imageArray.push(images);
  }
  /*-Reassigned-Plus-Errors-*/
  thisSpot.numReviews = length;
  thisSpot.avgStarRating = total / length;
  thisSpot.SpotImages = imageArray;
  thisSpot.Owner = aUser;
  if(!thisSpot.avgStarRating) {
    thisSpot.avgStarRating = 'Has not been rated yet'
  }
  if(!imageArray.length) {
    thisSpot.SpotImages = 'No images D:'
  }
  if(!thisSpot.numReviews) {
    thisSpot.numReviews = 'No reviews >:('
  }

  res.status(200).json({thisSpot});
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
               spot.previewImages = spotImage.url
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
    spot.avgStarRating = avg;
    spotsObj.Spots.push(spot);

 }
  res.status(200).json(spotsObj);
});

/*-Create a Booking Based on a Spot Id-*/
router.post('/:spotId/bookings', requireAuth, async (req, res) => {

      const currentUserId = req.user.id;
      const thisSpotId = req.params.spotId;
      const { startDate, endDate } = req.body;

      const spot = await Spot.findByPk(thisSpotId);
      if(!spot) {
        return res.status(404).json({ message: 'Spot could not be found.'});
      }

      if (currentUserId === spot.ownerId) {
        return res.status(403).json({ message: 'You cannot book your own spot. If only.'});
      }


      const existingBooking = await Booking.findOne({
        where: {
          spotId: thisSpotId,
          [Op.or]: [
            {
              startDate: {
                [Op.lte]: startDate,
              },
              endDate: {
                [Op.gte]: startDate,
              },
            },
            {
              startDate: {
                [Op.lte]: endDate,
              },
              endDate: {
                [Op.gte]: endDate,
              },
            },
          ],
        },
      });

      if(existingBooking){
        const errors = {};
        if(
          existingBooking.startDate <= startDate && existingBooking.endDate >= startDate
        ) {
          errors.startDate = 'Start date conflits with an existing booking >:(';
        }
        if (
          existingBooking.startDate <= endDate && existingBooking.endDate >= endDate
        ) {
          errors.endDate = 'End date conflits with an existing booking';
        }
        return res.status(403).json({ message: 'Sorry, this spot is already booked for the specified dates', errors});
      }

      if(new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({
          message: 'Bad Request',
          errors: {
            endDate: 'endDate cannot be on or before startDate',
          },
        });
      }

      const booking = await Booking.create({
        spotId: thisSpotId,
        userId: currentUserId,
        startDate,
        endDate
      });

      return res.status(200).json(booking);
});

/*-Create a Review for a Spot-*/
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const currentUserId = req.user.id;
    const currentSpotId = req.params.spotId;

    const spot = await Spot.findByPk(currentSpotId);
    if(!spot) {
      return res.status(404).json({ message: 'Spot could not be found.'});
    }

    const checkReview = await Review.findOne({
      where: {
        userId: currentUserId,
        spotId: currentSpotId
      }
    });
    if(checkReview) {
      return res.status(500).json({ message: 'User already has a review for this spot!'});
    }

    const newReview = await Review.create({
      userId: currentUserId,
      spotId: req.params.spotId,
      review,
      stars
    });

    res.status(201).json(newReview);
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


    res.status(200).json(newImage);
});

/*-Create A Spot-*/
router.post('/', requireAuth, validateSpot, async(req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const  user  = req.user.id;

  const newSpot = await Spot.create({
      ownerId: user,
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


/*-Edit A Spot-*/
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
const { address, city, state, country, lat, lng, name, description, price } = req.body;
const updateSpot = await Spot.findByPk(req.params.spotId);

if(!updateSpot){
  const err = new Error(`Could not find a Spot with specified id: ${req.params.spotId}`);
  err.statusCode = 404;
  return next(err);
}

if (address){
  updateSpot.address = address;
}
if (city) {
  updateSpot.city = city;
}
if (state) {
  updateSpot.state = state;
}
if(country) {
  updateSpot.state = country;
}
if(lat) {
  updateSpot.lat = lat;
}
if(lng) {
  updateSpot.lng = lng;
}
if(name) {
  updateSpot.name = name;
}
if(description) {
  updateSpot.description = description;
}
if(price) {
  updateSpot.price = price;
}
await updateSpot.save();
res.status(200).json({message: 'Edit successful', updateSpot});
});


/*-Delete A Spot-*/
router.delete('/:spotId', requireAuth, async (req, res, next) => {
  const user = req.user.toJSON();
  const spotToDelete = await Spot.findByPk(req.params.spotId);

  if(!spotToDelete) {
    return res.status(404).json({ message: 'Spot could not be found' });
  }

  if(user.id !== spotToDelete.ownerId) {
    return res.status(403).json({ message: 'Woop'})
  } else {
    await spotToDelete.destroy(); //include everything else?
    res.status(200).json({message: 'Successfully deleted'});
  }
});


/*-Errors-*/
// router.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   res.status(status);
//   res.json({
//       message: err.message || 'Oops',
//       statusCode: status
//   });
// });

// startDate: new Date('2023-06-06'),
// endDate: new Date('2023-06-26') how dates should be formatted

/*-Do Not Touch-*/
module.exports = router;
