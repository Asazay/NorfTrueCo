import './Orders.css'
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { getOrdersByUserIdThunk } from '../../redux/session';
import OrdersPageTile from './OrdersPageTile';

function OrdersPage(){
    const user = useSelector(state => state.session.user)
    const orders = useSelector(state => state.session.orders);
    const orderItems = useSelector(state => state.session.order_items)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if(user && user.id) dispatch(getOrdersByUserIdThunk(user.id)).catch(async res => {
            // let data;

            // if (res) {
            //     data = await res.json();
            // }

            // if (data && data.error) {
            //     setErrors(data.error)
            //     console.log(data.error)
            // }
        });
        
        else if(!user){
            navigate('/forbidden')
        }

    }, [])


    return (
        <div id='orders-page'>
            <div id='linkDiv'>
                <NavLink style={{fontSize: '26px'}} to='/'>Home |</NavLink>
                <NavLink style={{fontSize: '26px'}} to='/shop/products'>Shop</NavLink>
            </div>
            <div id='orders-h1'><h2>Orders</h2></div>
            <div id='orders-div'>
                {orders && Object.values(orders).length > 0 && Object.values(orders).map(order => (<OrdersPageTile key={order.order_number} order={order} orders={orders}/>))}
                {!orders && <div id='no-orders'><h1>No Orders</h1></div>}
            </div>
        </div>
    )
}

export default OrdersPage;