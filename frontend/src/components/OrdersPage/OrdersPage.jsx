import './Orders.css'
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { getOrdersByUserIdThunk } from '../../redux/session';
import OrdersPageTile from './OrdersPageTile';

function OrdersPage(){
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.session.orders);
    const orderItems = useSelector(state => state.session.order_items)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if(user && user.id) dispatch(getOrdersByUserIdThunk(user.id)).catch(async res => {
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

    }, [])


    return (
        <div id='orders-page'>
            <div id='orders-h1'><h2>Order History</h2></div>
            <div id='orders-div'>
                {orders && Object.values(orders).length > 0 && Object.values(orders).map(order => (<OrdersPageTile key={order.order_number} order={order}/>))}
            </div>
        </div>
    )
}

export default OrdersPage;