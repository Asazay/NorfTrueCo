import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from 'react-router-dom';
// import { getOrderItemsByOrderNumberThunk } from '../../redux/session';
import { deleteOrderItemByIdThunk } from '../../redux/session';
import { deleteOrderThunk } from '../../redux/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

function OrdersPageTile({ order }) {
    const user = useSelector(state => state.session.user);
    // const orderItems = useSelector(state => state.session.order_items);
    const dispatch = useDispatch()
    const [orderDate, setOrderDate] = useState('');
    const [errors, setErrors] = useState({});
    const [confirmDeleteItem, setConfirmDeleteItem] = useState(false);
    const [confirmDeleteOrder, setConfirmDeleteOrder] = useState(false);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (order && order.createdAt) {
            let formatDate = new Date(order.createdAt);
            setOrderDate(`${formatDate.getMonth() + 1}/${formatDate.getDate()}/${formatDate.getFullYear()}`)
        }
    }, []);

    useEffect(() => {
        if (order && order.order_items) console.log('HELLLOOO')
    }, [order])

    useEffect(() => {
        if(confirmDeleteOrder){
            handleDeleteOrder()
            setConfirmDeleteOrder(false)
        }
    }, [confirmDeleteOrder]);

    useEffect(() => {
        if(confirmDeleteItem){
            handleDeleteSelected()
            setConfirmDeleteItem(false)
        }
    }, [confirmDeleteItem])

    const handleDeleteOrder = () => {
        if (user && order) dispatch(deleteOrderThunk(user.id, order.order_number)).catch(async res => {

            // let data;

            // if (res) {
            //     data = await res.json();
            // }

            // if (data && data.error) {
            //     setErrors(data.error)
            //     console.log(data.error)
            // }
        });
    }

    const handleDeleteSelected = async () => {
        let selItems = document.getElementsByClassName('item-checkbox');

        let nonSelected = true;
        let count = 0;
        let selectedCount = 0;
        for (let item of selItems) {
            count += 1;
           
            if (item.value === 'off') {
                selectedCount += 1;
                if(nonSelected) nonSelected = false;
            }
        }

        if (nonSelected) {
            let newErrors = { ...errors }
            newErrors['selected'] = 'No items selected'
            return setErrors(newErrors)
        }

        if (count === 1 || (count - selectedCount) < 1) return dispatch(deleteOrderThunk(user.id, order.order_number)).catch(async res => {
            // let data;

            // if (res) {
            //     data = await res.json();
            // }

            // if (data && data.error) {
            //     setErrors(data.error)
            //     console.log(data.error)
            // }
        });

            for await (let selItem of selItems) {
            const [orderId, orderNumber] = selItem.id.split(',')
            if (selItem.value === 'off') {
                dispatch(deleteOrderItemByIdThunk(orderNumber, orderId)).catch(async res => {
                    console.log(res)
                    // let data;

                    // if (res) {
                    //     data = await res.json();
                    // }

                    // if (data && data.error) {
                    //     setErrors(data.error)
                    //     console.log(data.error)
                    // }
                });
            }
        }
    }

    const changeChecked = (e) => {
        if (e.target.value === 'on') e.target.value = 'off'
        else if (e.target.value === 'off') e.target.value = 'on'
        let updateErrors = {...errors}
        delete updateErrors['selected']
        setErrors(updateErrors)
    }

    const checkIsSelected = () => {
        let selItems = document.getElementsByClassName('item-checkbox');

        let nonSelected = true;
        for (let item of selItems) {
            if (item.value === 'off') nonSelected = false;
        }

        if (nonSelected) {
            let newErrors = { ...errors }
            newErrors['selected'] = 'No items selected'
            setErrors(newErrors)
            return nonSelected
        }

        return nonSelected
    }

    return (
        order && <div>
            <div id='tile-div'>
                <div id='tile-header'>
                    <div id="order-date">
                        <div>Order date:</div>
                        <div>{orderDate}</div>
                    </div>
                    <div id="order-number">
                        <div>Order #</div>
                        <div>{order.order_number}</div>
                    </div>
                    <div id="order-total">
                        <div>Total</div>
                        <div>{order && order.total_price ? '$' + order.total_price.toFixed(2) : ""}</div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div>{order.status}</div>
                    </div>
                </div>
                {order.Order_Items && Object.values(order.Order_Items).length > 0 && Object.values(order.Order_Items).map(item => (
                    item && <div key={item.id} id='tile-column'>
                        {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                        </div>}
                        <div><img src={item.image} width={150} height={150} /></div>
                        <div id='item-attributes'>
                            <div id='h4-div'><h4>{item.name}</h4></div>
                            <div><p>Color: {item.color}</p></div>
                            <div><p>Size: {item.size}</p></div>
                            <div><p>Price: {item.price}</p></div>
                            <div><p>Quantity: {item.quantity}</p></div>
                        </div>
                        {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div id='checkbox'>
                            <fieldset>
                                <label>Select: </label>
                                <input id={item.id + ',' + order.order_number} className='item-checkbox' type='checkbox' onChange={e => changeChecked(e)} />
                            </fieldset>
                        </div>}
                    </div>
                ))}
                <div id='btn-div'>
                    {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                        <OpenModalButton modalComponent={<ConfirmModal title={'Confirm Cancel'}
                            question={'Are you sure you want to cancel the order?'}
                            bodyTxt={"Your order cancel will be procesed. You will be refunded to the payment method used at checkout"}
                            confirmTxt={'Confirm'}
                            cancelTxt={'Cancel'}
                            modalFunction={setConfirmDeleteOrder}
                        />}
                            itemText={'Cancel Order'}
                    />
                        {/* <button onClick={e => handleDeleteOrder(e)}>Cancel Order</button> */}
                    </div>
                    }
                    {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                        <OpenModalButton modalComponent={<ConfirmModal title={'Confirm remove item'}
                        question={'Are you sure you want to remove the selected item(s)?'}
                        bodyTxt={'Item(s) will be removed. The final reciept will be emailed once order is processed'}
                        confirmTxt={'Confirm'}
                        cancelTxt={'Cancel'}
                        modalFunction={setConfirmDeleteItem}
                        />}
                        itemText={'Remove item(s)'}
                        openFunction={checkIsSelected}
                    />
                        {/* <button onClick={e => handleDeleteSelected(e)}>Remove selected item(s)</button> */}
                    </div>}{(errors && errors.selected && <p style={{ color: 'red'}}>{errors.selected}</p>) || <p style={{visibility: 'hidden', }}>''</p>}
                </div>
            </div>
        </div>
    )
}
export default OrdersPageTile;