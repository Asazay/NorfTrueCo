const express = require('express');
const { Op } = require('sequelize');
const { Order, Order_Item} = require('../../db/models');
const { checkAuth, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

router.get('/:orderNumber', async (req, res, next) => {
    const {orderNumber} = req.params;

    const orderItems = await Order_Item.findAll({
        where: {
            order_number: {
                [Op.eq]: parseInt(orderNumber)
            }
        },
        attributes: ['id', 'order_number', 'image', 'name', 'size', 'color',
            'price', 'quantity'
        ],
        order: [['name', 'DESC']]
    });

    if(orderItems){
        return res.json(orderItems)
    }

    else return res.json({error: 'Couldnt retrieve order items'})
});

router.delete('/:orderNumber/:itemId', async (req, res, next) => {
    const {orderNumber, itemId} = req.params;

    const theOrderItem = await Order_Item.findOne({
        where: {
            order_number: {
                [Op.eq]: parseInt(orderNumber)
            },
            id: {
                [Op.eq]: parseInt(itemId)
            }
        }
    });

    if(theOrderItem){
        await Order_Item.destroy({
            where: {
                order_number: {
                    [Op.eq]: parseInt(orderNumber)
                },
                id: {
                    [Op.eq]: parseInt(itemId)
                }
            },
            attributes: ['id', 'order_number', 'image', 'name', 'size', 'color',
                'price', 'quantity'
            ],
        })
    }

    else if(!theOrderItem) return res.json({error: 'The order item couldnt be retrieved'})

    // const newOrderItems = await Order_Item.findAll({
    //     where: {
    //         order_number: {
    //             [Op.eq]: parseInt(orderNumber)
    //         },
    //     }
    // });

    // if(newOrderItems){
    // }

    return res.json({orderNumber, itemId})
});

module.exports = router;