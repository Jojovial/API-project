const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
/*-Header Of Do Not Touch-*/


/*-Get All Bookings For a User-*/
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot
        }
    });
    res.status(200).json({ Bookings: bookings });
});

/*-Edit A Booking-*/
router.put('/:bookingId', requireAuth, async (req, res) =>{
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        userId,
      },
      include: {
        model: Spot,
      }
    });

    if(!booking) {
        return res.status(404).json({ message: 'Booking could not be found ヾ(｡ꏿ﹏ꏿ)ﾉﾞ'})
    }



    if(startDate && endDate && startDate > endDate) {
        return res.status(400).json({
            message: 'Bad Request (ﾉಥ益ಥ)ﾉ',
            errors: { endDate: 'endDate cannot come before startDate'}
        });
    }

    if(booking.endDate < new Date()) {
        return res.status(403).json({
            message: 'Past bookings cannot be modified! ヘ(￣ω￣ヘ) '
        })
    }

    const bookingConflicts = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            startDate: {
                [Op.lte]: new Date(endDate || booking.endDate)
            },
            endDate: {
                [Op.gte]: new Date(startDate || booking.startDate)
            },
                [Op.not]: { id: booking.id }
        }
    });

    if (bookingConflicts) {
        return res.status(403).json({
            message: 'Sorry, this spot is already booked for the specified dates! ┐(︶▽︶)┌',
            errors: {
                startDate: 'Start date conflicts with an existing booking',
                endDate: 'End date conflits with an existing booking'
            }
        });
    }

    const updateBooking = await booking.update({
        startDate: startDate || booking.startDate,
        endDate: endDate || booking.endDate
    });

    res.status(200).json(updateBooking);
});
/*-Delete A Booking-*/
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const thisBookingId = req.params.bookingId;

    const booking = await Booking.findOne({
        where: { id: thisBookingId },
        include: [{ model: Spot}],
    });

    if(!booking) {
        return res.status(404).json({ message: 'Booking could not be found ヾ(｡ꏿ﹏ꏿ)ﾉﾞ'});
    }

    if(new Date(booking.startDate) < new Date()) {
        return res.status(403).json({ message: 'Bookings that have been started cannot be deleted ( ఠ ͟ʖ ఠ)'});
    }

    if(booking.userId !== req.user.id && booking.Spot.ownerId !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized (ʘ ͜ʖ ʘ)'});
    }

    await booking.destroy();
    return res.status(200).json({ message: 'Trash, successfully taken out. (/￣ー￣)/~~☆’.･.･:★’.･.･:☆'});
});

/*-Do Not Touch-*/
module.exports = router;
