const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/

/*-Delete-A-Review-Image-*/
router.delete('/:reviewImageId', requireAuth, async(req, res) => {
    const currentUser = req.user.id;
    const thisReviewImage = req.params.reviewImageId;
    const toDeleteImage = await ReviewImage.findByPk(thisReviewImage);

    if(!toDeleteImage) {
        return res.status(404).json({ message: 'Review Image could not be found. ヾ(｡ꏿ﹏ꏿ)ﾉﾞ'});
    }
    const review = await Review.findByPk(toDeleteImage.reviewId);
    const reviewer = review.userId;

    if(currentUser !== reviewer) {
        return res.status(403).json({ message: 'Unauthorized! (ʘ ͜ʖ ʘ)'});
    }

    await toDeleteImage.destroy();
    return res.status(200).json({ message: 'Trash, successfully taken out. (/￣ー￣)/~~☆’.･.･:★’.･.･:☆'});
});
/*-Do Not Touch-*/
module.exports = router;
