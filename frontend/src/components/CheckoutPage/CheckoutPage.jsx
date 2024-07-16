import './Checkout.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [payFirstName, setPayFirstName] = useState('');
    const [payLastName, setPayLastName] = useState('')
    const [billAddress, setBillAddress] = useState('');
    const [billCity, setBillCity] = useState('');
    const [billState, setBillState] = useState('');
    const [billZipCode, setBillZipCode] = useState('');
    const [shipAddress, setShipBillAddress] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipState, setShipState] = useState('');
    const [shipZipCode, setShipZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('')

    return (
        <div id='checkout-page'>
            <div>
                <div><h1>Checkout</h1></div>
                <form>
                    <div id='customer-info'>
                        <h2>My Information</h2>
                        <div>
                            <div>
                                <label for='email'>Email: </label>
                                <input value={email} required></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>First name: </label>
                                <input value={firstName} required></input>
                            </div>
                            <div>
                                <label>Last name: </label>
                                <input value={lastName} required></input>
                            </div>
                        </div>
                    </div>
                    <div id='customer-bill-address'>
                        <h2>Billing Address</h2>
                        <div>
                            <div>
                                <label for='address'>Address: </label>
                                <input value={billAddress}></input>
                            </div>
                            <div>
                                <div>
                                    <label for='city'>City: </label>
                                    <input value={billCity}></input>
                                </div>
                                <div>
                                    <label for='zipcode'>Zip code: </label>
                                    <input type='text' value={billZipCode}></input>
                                </div>
                            </div>
                            <div>
                                <label for='state'>State: </label>
                                <input type='text' value={billState}></input>
                            </div>
                        </div>
                    </div>
                    <div id='customer-ship-address'>
                        <h2>Shipping Address</h2>
                        <div>
                            <div>
                                <label>Address: </label>
                                <input value={shipAddress}></input>
                            </div>
                            <div>
                                <div>
                                    <label>City: </label>
                                    <input value={shipCity}></input>
                                </div>
                                <div>
                                    <label>Zip code: </label>
                                    <input type='text' value={shipZipCode}></input>
                                </div>
                            </div>
                            <div>
                                <label>State: </label>
                                <input type='text' value={shipState}></input>
                            </div>
                        </div>
                    </div>
                    <div id='paymentDiv'>
                        <h2>Payment</h2>
                        <div>
                            <div>
                                <label>First name: </label>
                                <input value={payFirstName} required></input>
                            </div>
                            <div>
                                <label>Last name: </label>
                                <input value={payLastName} required></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Card number: </label>
                                <input type='text' value={cardNumber}></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Expiration date: </label>
                                <input type='text' value={expDate}></input>
                            </div>
                            <div>
                                <label>CVV: </label>
                                <input type='text' value={cvv}></input>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h2>Cart Information</h2>
            </div>
        </div>
    )
}

export default CheckoutPage;