import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { getOrderItemsByOrderNumberThunk } from '../../redux/session';
import { deleteOrderItemByIdThunk } from '../../redux/session';
import { deleteOrderThunk } from '../../redux/session';

function OrdersPageTile({ order }) {
    const user = useSelector(state => state.session.user);
    const orderItems = useSelector(state => state.session.order_items);
    const dispatch = useDispatch()
    const [orderDate, setOrderDate] = useState('');

    // console.log(order)

    useEffect(() => {
        if(order) dispatch(getOrderItemsByOrderNumberThunk(order.order_number)).catch(async res => {
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

        if(order && order.createdAt){
            let formatDate = new Date(order.createdAt);
            setOrderDate(`${formatDate.getMonth() + 1}/${formatDate.getDate()}/${formatDate.getFullYear()}`)
        }
    }, []);

    const handleDeleteOrder = (e) => {
        e.preventDefault();

        if(user && order) dispatch(deleteOrderThunk(user.id, order.order_number)).catch(async res => {
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
                        <div>{order.total_price ? '$' + order.total_price.toFixed(2) : ""}</div>
                    </div>
                    <div>
                        <div>Status</div>
                        <div>{order.status}</div>
                    </div>
                </div>
                {orderItems && Object.values(orderItems).length > 0 && Object.values(orderItems).map(item => (
                    item && <div key={item.id} id='tile-column'>
                        {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                            <div>
                                <fieldset>
                                <input className='item-checkbox' type='checkbox' value={item.name} onChange={e => {
                                    e.target.value ? e.target.value = false : e.target.value = true;
                                }} />
                                </fieldset>
                            </div>
                        </div>}
                        <div><img src={item.image} width={200} height={200} /></div>
                        <div>
                            <div><h4>Name: {item.name}</h4></div>
                            <div><p>Color: {item.color}</p></div>
                            <div><p>Size: {item.size}</p></div>
                            <div><p>Price: {item.price}</p></div>
                            <div><p>Quantity: {item.quantity}</p></div>
                        </div>
                    </div>
                ))}
                <div id='btn-div'>
                    {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                        <button onClick={e => handleDeleteOrder(e)}>Cancel Order</button>
                        </div>
                        }
                    {order.status && order.status !== 'shipped' && order.status !== 'delivered' && <div>
                        <button>Remove selected item(s)</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}
export default OrdersPageTile;