const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Item, Review, User } = require('../../db/models');
const { checkAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const allItemsQueryVal = [
  check('page').optional({ checkFalsy: true }).custom(async page => {
    page = Number(page);
    if (isNaN(page)) throw new Error()
    if (page < 1) throw new Error();
  }).withMessage("Page must be greater than or equal to 1"),
  check('size').optional({ checkFalsy: true }).custom(async size => {
    size = Number(size);
    if (isNaN(size)) throw new Error()
    if (size < 1) throw new Error();
  }).withMessage("Size must be greater than or equal to 1"),
  check('itemSize').optional({ checkFalsy: true }).isString().withMessage('Item size is invalid'),
  check('color').optional({ checkFalsy: true }).isString().withMessage('Color is invalid'),
  check('minPrice').optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice').optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage('Maximum price must be greater than or equal to 0'),
  check('category').optional({ checkFalsy: true }).isString().withMessage('Category must be a string'),
  check('gender').optional({ checkFalsy: true }).isString().withMessage('Gender must be a string'),
  handleValidationErrors
];

const router = express.Router();

router.get('/', allItemsQueryVal, async (req, res, next) => {
  let { page, size, itemSize, color, minPrice, maxPrice, category, gender } = req.query;
  let where = {};

  if (!page) page = 1;
  if (!size) size = 50;

  if (itemSize) {
    if (itemSize.includes(',')) itemSize = itemSize.split(',');
    else itemSize = [itemSize];
    where.size = { [Op.in]: itemSize }
  }
  if (color) {
    if (color.includes(',')) color = color.split(',')
    else color = [color]
    where.color = { [Op.in]: color }
  }

  if (minPrice && maxPrice) where.price = { [Op.between]: [Number(minPrice), Number(maxPrice)] };
  else if (minPrice) where.price = { [Op.gte]: Number(minPrice) }
  else if (maxPrice) where.price = { [Op.lte]: Number(maxPrice) };

  if (category) {
    if (category.includes(',')) category = category.split(",")
    else category = [category]
    where.category = { [Op.in]: category }
  }
  if (gender) where.gender = { [Op.eq]: gender }
  let allItems = await Item.findAll({
    where,
    offset: size * (page - 1),
    limit: size,
    include: [
      {
        model: Review,
      }
    ],
  });

  res.json({ items: allItems, page: page, size: size });
})

router.get('/:itemId', async (req, res, next) => {
  const { itemId } = req.params;

  let item = await Item.findOne({
    where: {
      id: { [Op.eq]: itemId }
    },
  })

  // let reviewCount;
  // let starCount;
  // let avg;

  if (item) {
    // item = item.toJSON()
    // if (item.Reviews && item.Reviews.length > 0) {
    //   let reviewCount = item.Reviews.length;
    //   let starCount = 0;
    //   item.Reviews.forEach((review, i) => {
    //     console.log(i)
    //     let formattedDate = new Date(review.createdAt)
    //     review.createdAt = `${formattedDate.getMonth() + 1}/${formattedDate.getDay()}/${formattedDate.getFullYear()}`
    //     return starCount += review.stars
    //   })
    //   let avg = parseFloat(starCount / reviewCount)
    //   item.reviewCount = reviewCount;
    //   item.avgStars = avg;
    // }

    res.json({ item })
  }

  else {
    res.status(404)
    res.json({errors: {
      notFound: 'Item not found'
    }})
  }
})
module.exports = router;