const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
/*-Header Of Do Not Touch-*/


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

/*-Get ALL Current Reviews-*/
router.get('/current', requireAuth, async (req, res)=> {
    const {id: currentUserId } = req.user.toJSON();
    const reviews = await Review.findAll({
        where: { userId: currentUserId},
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Spot },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });

    if(!reviews.length) {
        return res.status(404).json({ message: 'No reviews found for current user.'});
    }

    const result = { Reviews: reviews};
    res.status(200).json(result);
});
/*-Create Image for a Review-*/
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.toJSON().id;

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
        }
    });

    if(!review) {
        return res.status(404).json({ message: 'Review could not be found'});
    }

    const existingImages = await ReviewImage.count({
        where: {
            reviewId: reviewId,
        },
    });

    if(existingImages >= 10) {
        return res.status(403).json({ message: 'Maximum number of images for this response was reached'});
    }

    const newImage = await ReviewImage.create({
        reviewId: reviewId,
        url: req.body.url
    });

    return res.status(200).json({
        id: newImage.id,
        url: newImage.url
    });
});
/*-Edit Review-*/
router.put('/:reviewId', requireAuth, validateReview, async(req, res) =>{
    const thisReviewId = req.params.reviewId;
    const currentUser = req.user.id;
    const { review, stars } = req.body;

    const editReview = await Review.findByPk(thisReviewId);
    if(!editReview) {
        return res.status(404).json({ message: 'Review could not be found'});
    }

    if(currentUser !== editReview.userId) {
        return res.status(403).json({ message: 'Um, awkward this is not your review'});
    }

    await editReview.update({ review, stars});
    return res.status(200).json(editReview);
});
/*-Delete Review-*/
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const thisReviewId = req.params.reviewId;
    const currentUser = req.user.id;

    const deleteReview = await Review.findByPk(thisReviewId);

    if(!deleteReview) {
        return res.status(404).json({ message: 'Review could not be found'});
    }

    if(currentUser !== deleteReview.userId) {
        return res.status(403).json({ message: 'Um, you cannot delete what is not yours buddy'});

    }

    await deleteReview.destroy();
    return res.status(200).json({ message: 'Badabing, successfully deleted!'});
});






/*-Do-Not-Touch-*/
module.exports = router;
