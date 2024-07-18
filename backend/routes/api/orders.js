const express = require('express');
const { Op } = require('sequelize');
const { Order, Order_Item, Order_Information, User } = require('../../db/models');
const { checkAuth, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const order_information = require('../../db/models/order_information');
const { IGNORE } = require('sequelize/lib/index-hints');


const checkAuthorization = [requireAuth, handleValidationErrors];

const validateCheckout = [
    check('email').exists({ checkFalsy: true }).notEmpty().isEmail()
        .withMessage('Invalid email. (Ex: Example@example.com)'),
    check('firstName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({min: 3, max: 16})
        .withMessage('First name is invalid. (Ex: James)'),
    check('lastName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({min: 3, max: 16})
        .withMessage('Last name is invalid. (Ex: Williams)'),
    check('billAddress').exists({ checkFalsy: true }).notEmpty()
        .custom(async (value) => {
            if (!value.match(/[0-9]{3,5}\s[A-Za-z]+\s?[A-Za-z]*\s?[A-Za-z]*/g)) throw new Error('Address is invalid. (Ex: 1234 Rodeo Way')
        }),
    check('billCity').exists({ checkFalsy: true }).notEmpty().isAlpha()
        .withMessage('City is invalid. (Ex: Atlanta)'),
    check('billState').exists({ checkFalsy: true }).notEmpty().isAlpha()
        .withMessage('Please select a state'),
    check('billZipCode').exists({ checkFalsy: true }).notEmpty().not().contains(' ')
        .custom(async value => {
            if (value.length !== 5 || typeof Number(value) !== 'number') throw new Error('Invalid zip code (Ex: 55555)')
        }),
    check('shipAddress').exists({ checkFalsy: true }).notEmpty()
        .custom(async (value) => {
            if (!value.match(/[0-9]{3,5}\s[A-Za-z]+\s?[A-Za-z]*\s?[A-Za-z]*/g)) throw new Error('Address is invalid. (Ex: 1234 Rodeo Way')
        }),
    check('shipCity').exists({ checkFalsy: true }).notEmpty().isAlpha()
        .withMessage('City is invalid. (Ex: Atlanta)'),
    check('shipState').exists({ checkFalsy: true }).notEmpty().isAlpha()
        .withMessage('Please select a state'),
    check('shipZipCode').exists({ checkFalsy: true }).notEmpty().not().contains(' ')
        .custom(async value => {
            if (value.length !== 5 || typeof Number(value) !== 'number') throw new Error('Invalid zip code. (Ex: 55555)')
        }),
    check('cardNumber').exists({ checkFalsy: true }).notEmpty().isAlphanumeric()
        .custom(async value => {
            if (value.length !== 16 || typeof Number(value) !== 'number') throw new Error('Invalid card number. (Ex: 1234567891234567')
        }),
    check('payFirstName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({min: 3, max: 16})
    .withMessage('First name is invalid. (Ex: James)'),
    check('payLastName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({min: 3, max: 16})
        .withMessage('Last name is invalid. (Ex: Williams)'),
    check('expDate').exists({ checkFalsy: true }).notEmpty().custom(async val => {
        if(!val) throw new Error('Expiration date is invalid. (Ex. 11/25)')
        if(val && !val.split('/')) throw new Error('Expiration date is invalid. (Ex. 11/25)')
        if(val){
            if(val.length !== 5) throw new Error('Expiration date is invalid. (Ex. 11/25)')
            val = val.split('/');
            if(typeof parseInt(val[0] !== 'number') || typeof parseInt(val[1] !== 'number')) throw new Error('Expiration date is invalid. (Ex. 11/25)') 
        }
    }),
    check('cvv').exists({ checkFalsy: true }).notEmpty().not().custom(async val => typeof Number(val) === 'number')
    .withMessage('CVV is invalid. (Ex: 123)'),
    handleValidationErrors
]

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;

    let orders = await Order.findAll({
        where: {
            user_id: {
                [Op.eq]: parseInt(userId)
            }
        },
        include: 'Order_Information'
    });

    if (orders) {
        res.json(orders)
    }
    else res.json({ error: 'Orders for user not found' })
});

router.post('/:userId', validateCheckout, async (req, res, next) => {

    const { userId } = req.params;
    const { items, recieptInfo, firstName, lastName, email, billAddress, billCity, billState,
        billZipCode, shipAddress, shipCity, shipState, ShipZipCode, cardNumber } = req.body;

    if (!userId) {
        const orderNum = parseInt('2024' + Math.floor(Math.random() * (999 - 1 + 1) + 1).toString());

        const unregCustOrder = await Order.create({
            user_id: null,
            order_number: orderNum,
            registered: false,
            status: 'processing'
        });

        if (unregCustOrder) {
            const unregOrderInfo = await unregCustOrder.createOrderInformation({
                order_number: orderNum,
                first_name: firstName,
                last_name: lastName,
                email: email,
                bill_address: billAddress,
                bill_city: billCity,
                bill_state: billState,
                bill_zip_code: billZipCode,
                ship_address: shipAddress,
                ship_city: shipCity,
                ship_state: shipState,
                ship_zip_code: ShipZipCode,
                card_number: cardNumber.slice(-1, -5)
            });

            const itemArr = [];

            Object.values(items).forEach(async item => {
                const { image, name, size, color, price, quantity } = item;

                itemArr.push(await Order_Item.create({
                    image, name, size, color, price, quantity
                }))
            });

            if (unregOrderInfo && !itemArr.some(item => item ? true : false)) {
                res.json(unregCustOrder)
            }

            else res.json({ error: 'Something went wrong when creating order info and items' })
        }

        else res.json({ error: 'Something went wrong when creating order' })
    }

    const user = await User.findByPk(parseInt(userId));

    if (user) {
        const orderNum = parseInt('2024' + Math.floor(Math.random() * (999 - 1 + 1) + 1).toString());
        let newOrder = await Order.create({
            user_id: parseInt(userId),
            order_number: orderNum,
            registered: true,
            status: 'processing'
        })

        if (newOrder) {
            const orderInfo = await Order_Information.create({
                order_number: orderNum,
                first_name: firstName,
                last_name: lastName,
                email: email,
                bill_address: billAddress,
                bill_city: billCity,
                bill_state: billState,
                bill_zip_code: billZipCode,
                ship_address: shipAddress,
                ship_city: shipCity,
                ship_state: shipState,
                ship_zip_code: ShipZipCode,
                card_number: cardNumber ? cardNumber.slice(-4) : 'xxxx'
            })

            const itemArr = [];

            Object.values(items).forEach(async item => {
                const { image, name, size, color, price, quantity } = item;

                itemArr.push(await Order_Item.create({
                   order_number: orderNum, image, name, size, color, price, quantity
                }))
            });

            if (orderInfo) {
                res.json(newOrder)
            }
        }
        else res.json({ error: "Order couldn't be created" })
    }

    else res.json({ error: 'User not found' })
});

router.get('/:userId/:orderNumber', async (req, res, next) => {
    const { userId, orderNumber } = req.params;

    const order = await Order.findOne({
        where: {
            user_id: {
                [Op.eq]: parseInt(userId)
            },
            orderNumber: {
                [Op.eq]: parseInt(orderNumber)
            }
        }
    });

    if (order) {
        res.json(order)
    }

    else res.json({ error: 'Order not found' })
});

module.exports = router;