const express = require('express');
const { Op } = require('sequelize');
const { Review, User} = require('../../db/models');
const { checkAuth, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const checkAuthorization = [requireAuth, handleValidationErrors];

const checkEditReview = [
  check('review').exists({checkFalsy: true}).notEmpty()
  .withMessage("Review text is required"),
  check('stars').exists({checkFalsy: true}).isInt({
    min: 1,
    max: 5
  }).withMessage("Stars must be an integer from 1 to 5"),
  checkAuthorization
]

const router = express.Router();

router.get('/:itemId', async (req, res, next) => {
    const {itemId} = req.params;

    let reviews = await Review.findAll({
        where: {
            item_id: {
                [Op.eq]: itemId
            }
        }
    });

    if(reviews){
        reviews = reviews.map(review => {
            review = review.toJSON();
            let date = new Date(review.createdAt);
            review.createdAt = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            return review;
        })
        res.json(reviews)
    }

    else return res.json({error: 'Reviews not found'})
});

router.post('/', async (req, res, next) => {
    const {reviewInfo} = req.body;
    reviewInfo.user_id = req.user.id;

    const user = await User.findOne({
        where: {
            id: {
                [Op.eq]: req.user.id
            }
        }
    });

    if(user){
        const newReview = await user.createReview(reviewInfo);

        if(newReview){
            res.status = 201
            res.json(newReview)
        }

        else return res.json({Error: 'Review not created. User error'})
    }

    else return res.json({error: 'User not found. Try again'})
});

router.put('/:reviewId', checkEditReview, async (req, res, next) => {
    const {reviewId} = req.params;

    let review = await Review.findByPk(parseInt(reviewId));
    
})

module.exports = router;