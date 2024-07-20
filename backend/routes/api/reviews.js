const express = require('express');
const { Op } = require('sequelize');
const { Review, User } = require('../../db/models');
const { checkAuth, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const checkAuthorization = [requireAuth, handleValidationErrors];

const checkEditReview = [
    check('comment').exists({ checkFalsy: true }).notEmpty()
        .withMessage("Review text is required"),
    check('stars').exists({ checkFalsy: true }).isInt({
        min: 1,
        max: 5
    }).withMessage("Stars must be an integer from 1 to 5"),
    checkAuthorization
]

const router = express.Router();

router.get('/:itemId', async (req, res, next) => {
    const { itemId } = req.params;

    let reviews = await Review.findAll({
        where: {
            item_id: {
                [Op.eq]: itemId
            }
        }
    });

    if (reviews) {
        let totalStars = 0;

        reviews = reviews.map(review => {
            review = review.toJSON();
            let date = new Date(review.createdAt);
            review.createdAt = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

            totalStars += review.stars;

            return review;
        })
        res.json({
            reviews,
            totalReviews: reviews.length,
            avgStars: totalStars / reviews.length
        })
    }

    else return res.json({ error: 'Reviews not found' })
});

router.get('/:itemId/:reviewId', async (req, res, next) => {
    const { itemId, reviewId } = req.params;

    const review = await Review.findOne({
        where: {
            id: {
                [Op.eq]: parseInt(reviewId)
            },

            item_id: {
                [Op.eq]: parseInt(itemId)
            }
        }
    });

    if (review) {
        res.json(review)
    }

    else res.json({ message: 'Something went wrong' })
})

router.post('/:itemId', async (req, res, next) => {
    const { itemId } = req.params;
    const { reviewInfo } = req.body;
    reviewInfo.user_id = req.user.id;

    const user = await User.findOne({
        where: {
            id: {
                [Op.eq]: req.user.id
            }
        }
    });

    if (user) {
        let newReview = await user.createReview(reviewInfo);

        if (newReview) {
            newReview = await newReview.toJSON();
            let newDate = new Date(newReview.createdAt)
            newReview.createdAt = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
            res.json(newReview)
        }

        else return res.json({ Error: 'Review not created. User error' })
    }

    else return res.json({ error: 'User not found. Try again' })
});

router.put('/:itemId/:reviewId', checkEditReview, async (req, res, next) => {
    const { itemId, reviewId } = req.params;

    let review = await Review.findOne({
        where: {
            id: {
                [Op.eq]: parseInt(reviewId)
            },
            item_id: {
                [Op.eq]: parseInt(itemId)
            }
        }
    });

    if (review) {
        let editedReview = await review.update(req.body)
        editedReview = await editedReview.toJSON();
        let newDate = new Date(editedReview.createdAt)
        editedReview.createdAt = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
        res.json(editedReview)
    }

    else res.json({
        message: 'Review not found'
    })

});

router.delete('/:itemId/:reviewId', async (req, res, next) => {
    const { itemId, reviewId } = req.params;

    let review = await Review.findOne({
        where: {
            id: {
                [Op.eq]: parseInt(reviewId)
            },
            item_id: {
                [Op.eq]: parseInt(itemId)
            }
        }
    })

    if (review) {
        await review.destroy()
        res.json({ message: 'Deletion Successful', reviewId })
    }

    else {
        res.json({ error: 'Review not found.' })
    }
})

module.exports = router;