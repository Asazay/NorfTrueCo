import './Confirmation.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getOrderByOrderNumberThunk } from '../../redux/session';

function ConfirmationPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user);
    const order = useSelector(state => state.session.orders)
    const [errors, setErrors] = useState({})
    const params = new URLSearchParams(window.location.search);
    const confirmationNum = params.get('cfn')

    useEffect(() => {
        localStorage.removeItem('cart');
        
        if (confirmationNum) {
            let value;
            if(user && user.id) value = user.id
            else value = null;

            dispatch(getOrderByOrderNumberThunk(value, parseInt(confirmationNum))).catch(async res => {
                let data;

                if (res) {
                    data = await res.json();
                    if (data && data.order) {
                        setErrors(data)
                    }
                }
            });
        }

    }, []);

    useEffect(() => {
        if(Object.keys(errors).includes('order')) navigate('/not-found')
    }, [errors])

    const handleHome = (e) => {
        e.preventDefault()
        navigate('/')
    }

        return (
            <div>
                <div><h2>THANK YOU!</h2></div>
                <div>
                    <p>We are getting started on your order right away. You will recieve an order confirmation
                    shortly to the email {order && order.Order_Information && <span>{order.Order_Information.email}</span>}. Feel free to shop some more!
                    </p>
                </div>
                <div>
                    <button onClick={(e) => handleHome(e)}>HOME</button>
                </div>
            </div>
        )
}

export default ConfirmationPage;