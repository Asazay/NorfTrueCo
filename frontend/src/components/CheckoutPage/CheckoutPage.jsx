import './Checkout.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [payFirstName, setPayFirstName] = useState('');
    const [payLastName, setPayLastName] = useState('')
    const [billAddress, setBillAddress] = useState('');
    const [billCity, setBillCity] = useState('');
    const [billState, setBillState] = useState('');
    const [billZipCode, setBillZipCode] = useState('');
    const [shipAddress, setShipAddress] = useState('');
    const [shipCity, setShipCity] = useState('');
    const [shipState, setShipState] = useState('');
    const [shipZipCode, setShipZipCode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [salesTax, setSalesTax] = useState(0)
    const [total, setTotal] = useState(0)
    const [errors, setErrors] = useState({});

    const [cart, setCart] = useState(null)

    const states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
        "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ]

    const stateSalesTax = [
        .04, 0, .0560, .0650, .06, .0290, .0635, 0, .06, .04, .04, .06,
        .0625, .07, .06, .0650, .06, .0445, .0550, .06, .0560, .06, .0688,
        .07, .0423, 0, .0550, .0460, 0, .0663, .0513, .04, .0475, .05,
        .0575, .0450, 0, .06, .07, .06, .0450, .07, .0625, .0470, .06, .0430,
        .0650, .06, .05, .04
    ]


    useEffect(() => {
        if (localStorage.getItem('cart') !== null) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
        else if (localStorage.getItem('cart') === null) {
            navigate(`/cart`)
        }
    }, [])

    useEffect(() => {
        if (states.includes(shipState)) {
            let stateIndex = states.findIndex((state) => state === shipState)
            if (cart && cart.total) {
                let staSalTax = (cart.total + 5.99) * stateSalesTax[stateIndex];
                setSalesTax(staSalTax)
                setTotal((cart.total + 5.99 + staSalTax))
            }
        }
        else {
            setSalesTax("");
            if (cart && cart.total) {
                setTotal(cart.total + 5.99)
            }
        }
    }, [shipState])

    return (
        <div id='checkout-page'>
            <div id='customer-info'>
                <div><h1>Checkout</h1></div>
                <form onSubmit={() => console.log('form submitted')}>
                    <div>
                        <h2>My Information</h2>
                        <div>
                            <div>
                                <label htmlFor='email'>Email: </label>
                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} required></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>First name: </label>
                                <input value={firstName} onChange={e => setFirstName(e.target.value)} required pattern="[A-Za-z]{3,16}" title="First name must be 3-16 characters"></input>
                            </div>
                            <div>
                                <label>Last name: </label>
                                <input value={lastName} onChange={e => setLastName(e.target.value)} required pattern="[A-Za-z]{3,16}" title="Last name invalid"></input>
                            </div>
                        </div>
                    </div>
                    <div id='customer-ship-address'>
                        <h2>Shipping Address</h2>
                        <div>
                            <div>
                                <label>Address: </label>
                                <input value={shipAddress} onChange={e => setShipAddress(e.target.value)} required pattern="[0-9]{3,5}\s[A-Za-z]+" title='Address is required(ex: 1234 Madison Ave)'></input>
                            </div>
                            <div>
                                <div>
                                    <label>City: </label>
                                    <input value={shipCity} onChange={e => setShipCity(e.target.value)} required pattern='[A-Za-z]+' title='City is required(ex: Atlanta)'></input>
                                </div>
                                <div>
                                    <label>Zip code: </label>
                                    <input type='text' value={shipZipCode} onChange={e => setShipZipCode(e.target.value)} required pattern='[0-9]{5,5}' title='Zip code required(Ex: 55555)'></input>
                                </div>
                            </div>
                            <div>
                                <label>State: </label>
                                <select value={shipState} onChange={e => setShipState(e.target.value)} onInvalid={e => e.target.setCustomValidity("Please select a state")} required>
                                    <option value=''>Select a state</option>
                                    {states.map((state, i) => (<option key={`${i}-state`} value={state}>{state}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id='customer-bill-address'>
                        <h2>Billing Address</h2>
                        <div>
                            <div>
                                <label for='address'>Address: </label>
                                <input value={billAddress} onChange={e => setBillAddress(e.target.value)}></input>
                            </div>
                            <div>
                                <div>
                                    <label for='city'>City: </label>
                                    <input value={billCity} onChange={e => setBillCity(e.target.value)}></input>
                                </div>
                                <div>
                                    <label for='zipcode'>Zip code: </label>
                                    <input type='text' value={billZipCode} onChange={e => setBillZipCode(e.target.value)}></input>
                                </div>
                            </div>
                            <div>
                                <label for='state'>State: </label>
                                <select value={billState} onChange={e => setBillState(e.target.value)}>
                                    <option value=''>Select a state</option>
                                    {states.map((state, i) => (<option key={`${i}-state`} value={state}>{state}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div id='paymentDiv'>
                        <h2>Payment</h2>
                        <div>
                            <div>
                                <label>First name: </label>
                                <input value={payFirstName} onChange={e => setPayFirstName(e.target.value)} required></input>
                            </div>
                            <div>
                                <label>Last name: </label>
                                <input value={payLastName} onChange={e => setPayLastName(e.target.value)} required></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Card number: </label>
                                <input type='text' value={cardNumber} onChange={e => setCardNumber(e.target.value)}></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Expiration date: </label>
                                <input type='text' value={expDate} onChange={e => setExpDate(e.target.value)}></input>
                            </div>
                            <div>
                                <label>CVV: </label>
                                <input type='text' value={cvv} onChange={e => setCvv(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
            <div id='cartTotal'>
                <div>
                    <div>
                        <div>
                            <p>Subtotal: {cart && cart.total}</p>
                            <p>Shipping: $5.99</p>
                            <p>Est. Taxes: {salesTax !== "" && salesTax >= 0 && `$${salesTax.toFixed(2)}` || 'TBD'}</p>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>Total: ${total && total.toFixed(2) || cart && (cart.total + 5.99).toFixed(2)}</div>
                    </div>
                    <div>
                        <button>Place order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;