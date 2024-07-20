const express = require('express');
const { Op } = require('sequelize');
const { Order, Order_Item, Order_Information, User } = require('../../db/models');
const { checkAuth, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const checkAuthorization = [requireAuth, handleValidationErrors];

const validateCheckout = [
    check('email').exists({ checkFalsy: true }).notEmpty().isEmail()
        .withMessage('Invalid email. (Ex: Example@example.com)'),
    check('firstName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({ min: 3, max: 16 })
        .withMessage('First name is invalid. (Ex: James)'),
    check('lastName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({ min: 3, max: 16 })
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
    check('payFirstName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({ min: 3, max: 16 })
        .withMessage('First name is invalid. (Ex: James)'),
    check('payLastName').exists({ checkFalsy: true }).notEmpty().isAlpha().isLength({ min: 3, max: 16 })
        .withMessage('Last name is invalid. (Ex: Williams)'),
    check('expDate').exists({ checkFalsy: true }).notEmpty().custom(async val => {
        if (val.split('/').length < 2) throw new Error('Expiration date is invalid. (Ex. 11/25)')
        if (val.length !== 5) throw new Error('Expiration date is invalid. (Ex. 11/25)')
        val = val.split('/');
        if (typeof parseInt(val[0]) !== 'number' || typeof parseInt(val[1]) !== 'number') throw new Error('Expiration date is invalid. (Ex. 11/25)')
    }),
    check('cvv').exists({ checkFalsy: true }).notEmpty().custom(async val => typeof Number(val) === 'number')
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
            },
        },
        order: [['createdAt']]
    });

    if (orders) {
        let orderArray = await Promise.all((orders.map(async order => {
            order = await order.toJSON();
            let orderInfo = await Order_Information.findOne({
                where: {
                    order_number: {
                        [Op.eq]: parseInt(order.order_number)
                    }
                },
            });

            let orderItems = await Order_Item.findAll({
                where: {
                    order_number: {
                        [Op.eq]: parseInt(order.order_number)
                    }
                },
                attributes: ['id', 'order_number', 'image', 'name', 'size', 'color',
                    'price', 'quantity'
                ],
                order:[['createdAt']]
            })

            if(orderInfo && orderItems){
                orderInfo = await orderInfo.toJSON()
                order.Order_Information = orderInfo;
                order.Order_Items = orderItems;
                return order
            }
            else {
                res.status(400)
                res.json({error: 'Couldnt retrieve orders'})
            }
        })));
        
        res.json(orderArray)
    }
    else {
        res.status(400)
        return res.json({ error: 'Orders for user not found' })
    }
});

router.post('/:userId', validateCheckout, async (req, res, next) => {

    const { userId } = req.params;
  
    const { items, firstName, lastName, email, billAddress, billCity, billState,
        billZipCode, shipAddress, shipCity, shipState, ShipZipCode, cardNumber, orderTotal } = req.body;

    if (JSON.parse(userId) === null) {
        const orderNum = parseInt('2024' + Math.floor(Math.random() * (999 - 1 + 1) + 1).toString());

        const unregCustOrder = await Order.create({
            user_id: null,
            order_number: orderNum,
            registered: false,
            status: 'processing',
            total_price: orderTotal
        });

        if (unregCustOrder) {
            const unregOrderInfo = await Order_Information.create({
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
                    order_number: orderNum, image, name, size, color, price, quantity
                }))
            });

            if (unregOrderInfo && !itemArr.some(item => item ? true : false)) {
                return res.json(unregCustOrder)
            }

            else return res.json({ error: 'Something went wrong when creating order info and items' })
        }

        else return res.json({ error: 'Something went wrong when creating order' })
    }

    const user = await User.findByPk(parseInt(userId))

    if (user) {
        const orderNum = parseInt('2024' + Math.floor(Math.random() * (999 - 1 + 1) + 1).toString());
        let newOrder = await Order.create({
            user_id: parseInt(userId),
            order_number: orderNum,
            registered: true,
            status: 'processing',
            total_price: orderTotal
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
    const where = {}

    if (typeof Number(userId) !== 'number' || !userId) {
        where.user_id = { [Op.eq]: null }
    }

    else where.user_id = { [Op.eq]: parseInt(userId) }

    where.order_number = {
        [Op.eq]: parseInt(orderNumber)
    };

    let order = await Order.findOne({
        where,
    });

    if (order) {
        const theOrderInfo = await Order_Information.findOne({
            where: {
                order_number: {
                    [Op.eq]: parseInt(orderNumber)
                }
            }
        });

        if (theOrderInfo) {
            order = order.toJSON();
            order.Order_Information = theOrderInfo;
            return res.json(order)
        }

        else { res.status(400); return res.json({ order: 'The order could not be retrieved.' }) }
    }

    else { res.status(400); return res.json({ order: 'Order not found' }) }
});

router.delete('/:userId/:orderNumber', async (req, res, next) => {
    const {userId, orderNumber} = req.params

    const order = await Order.findOne({
        where: {
            user_id: {
                [Op.eq]: parseInt(userId)
            },
            order_number: {
                [Op.eq]: parseInt(orderNumber)
            }
        }
    });

    if(order){
        await order.destroy()

        const orderItems = await Order_Item.findAll({
            where: {
                order_number: {
                    [Op.eq]: parseInt(orderNumber)
                }
            }
        });

        if(orderItems){
            orderItems.forEach(async item => {
                await item.destroy()
            });
        }

        const orderInfo = await Order_Information.findOne({
            where: {
                order_number: {
                    [Op.eq]: parseInt(orderNumber)
                }
            }
        });

        if(orderInfo){
            await orderInfo.destroy()
        }

        return res.json(order.order_number)
    }

    else if(!order) return res.json({error: 'Couldnt find order'})

    return res.json(order.order_number)
})


module.exports = router;