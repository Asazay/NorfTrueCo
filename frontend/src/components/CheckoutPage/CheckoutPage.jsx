import './Checkout.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createOrderThunk } from '../../redux/session';

function CheckoutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

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
    const shipping = 5.99;

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
    }, [shipState]);

    useEffect(() => {

    }, [errors])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const createOrderInfo = {
            items: cart ? cart.items : {},
            receiptInfo: {
                subtotal: cart ? cart.total : 0,
                shipping,
                salesTax: salesTax ? salesTax.toFixed(2) : 0,
                total: total ? total.toFixed(2) : 0
            },
            email,
            firstName,
            lastName,
            billAddress,
            billCity,
            billState,
            billZipCode,
            shipAddress,
            shipCity,
            shipState,
            shipZipCode,
            cardNumber
        }

        dispatch(createOrderThunk(user ? user.id : null, createOrderInfo)).catch(async res => {
            let data;

            if (res) {
                data = await res.json();
            }

            if (data && data.errors) setErrors(data.errors)
        });
    }



    return (
        <div id='checkout-page'>
            <div id='customer-info'>
                <div><h1>Checkout</h1></div>
                <form id='checkoutForm' onSubmit={(e) => handleFormSubmit(e)}>
                    <div>
                        <h2>My Information</h2>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.email && <p>{errors.email}</p>}
                                <label htmlFor='email'>Email: </label>
                                <input id='email' name='email' type='email' value={email} onChange={e => {
                                        setEmail(e.target.value)
                                        const newErrors = {...errors}
                                        if(newErrors.email) delete newErrors.email;
                                        setErrors(newErrors)
                                    }
                                }
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.firstName && <p>{errors.firstName}</p> || <p></p>}
                                <label>First name: </label>
                                <input id='firstName' name='first name' value={firstName} onChange={e => {
                                    setFirstName(e.target.value);
                                    const newErrors = {...errors}
                                        if(newErrors.firstName) delete newErrors.firstName;
                                        setErrors(newErrors)
                                }
                            }
                                />
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.lastName && <p>{errors.lastName}</p> || <p></p>}
                                <label>Last name: </label>
                                <input id='last Name' value={lastName} onChange={e => {
                                    setLastName(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.lastName) delete newErrors.lastName;
                                        setErrors(newErrors)
                                }
                            }
                                />
                            </div>
                        </div>
                    </div>
                    <div id='customer-ship-address'>
                        <h2>Shipping Address</h2>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.shipAddress && <p>{errors.shipAddress}</p> || <p></p>}
                                <label>Address: </label>
                                <input id='shipAddress' value={shipAddress} onChange={e => {
                                    setShipAddress(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.shipAddress) delete newErrors.shipAddress;
                                        setErrors(newErrors)
                                }
                            }
                                />
                            </div>
                            <div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.shipCity && <p>{errors.shipCity}</p> || <p></p>}
                                    <label>City: </label>
                                    <input id='shipCity' value={shipCity} onChange={e => {
                                        setShipCity(e.target.value)
                                        const newErrors = {...errors}
                                        if(newErrors.shipCity) delete newErrors.shipCity;
                                        setErrors(newErrors)
                                    }
                                }
                                    />
                                </div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.shipZipCode && <p>{errors.shipZipCode}</p> || <p></p>}
                                    <label>Zip code: </label>
                                    <input id='shipZipCode' type='text' value={shipZipCode} onChange={e => {
                                        setShipZipCode(e.target.value)
                                        const newErrors = {...errors}
                                        if(newErrors.shipZipCode) delete newErrors.shipZipCode;
                                        setErrors(newErrors)
                                    }
                                }
                                    />
                                </div>
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.shipState && <p>{errors.shipState}</p> || <p></p>}
                                <label>State: </label>
                                <select id='shipState' value={shipState} onChange={e => {
                                    setShipState(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.shipState) delete newErrors.shipState;
                                        setErrors(newErrors)
                                    }
                                    }>
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
                                {errors && Object.keys(errors).length > 0 && errors.billAddress && <p>{errors.billAddress}</p> || <p></p>}
                                <label htmlFor='address'>Address: </label>
                                <input id='billAddress' value={billAddress} onChange={e => {
                                    setBillAddress(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.billAddress) delete newErrors.billAddress;
                                        setErrors(newErrors)
                                }
                            }
                                />
                            </div>
                            <div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.billCity && <p>{errors.billCity}</p> || <p></p>}
                                    <label htmlFor='city'>City: </label>
                                    <input id='billCity' value={billCity} onChange={e => {
                                        setBillCity(e.target.value)
                                        const newErrors = {...errors}
                                        if(newErrors.billCity) delete newErrors.billCity;
                                        setErrors(newErrors)
                                    }
                                }
                                    />
                                </div>
                                <div>
                                    {errors && Object.keys(errors).length > 0 && errors.billZipCode && <p>{errors.billZipCode}</p> || <p></p>}
                                    <label htmlFor='zipcode'>Zip code: </label>
                                    <input id='billZipCode' type='text' value={billZipCode} onChange={e => {
                                        setBillZipCode(e.target.value)
                                        const newErrors = {...errors}
                                        if(newErrors.billZipCode) delete newErrors.billZipCode;
                                        setErrors(newErrors)
                                    }
                                }
                                    />
                                </div>
                            </div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.billState && <p>{errors.billState}</p> || <p></p>}
                                <label htmlFor='state'>State: </label>
                                <select id='billState' value={billState} onChange={e => {
                                    setBillState(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.billState) delete newErrors.billState;
                                        setErrors(newErrors)
                                    }
                                    }>
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
                                <input id='payFirstName' value={payFirstName} onChange={e => {
                                    setPayFirstName(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.payFirstName) delete newErrors.payFirstName;
                                        setErrors(newErrors)
                                    }
                                    } />
                            </div>
                            <div>
                                <label>Last name: </label>
                                <input id='payLastName' value={payLastName} onChange={e => {
                                    setPayLastName(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.payLastName) delete newErrors.payLastName;
                                        setErrors(newErrors)
                                    }
                                    } />
                            </div>
                        </div>
                        <div>
                            <div>
                                {errors && Object.keys(errors).length > 0 && errors.cardNumber && <p>{errors.cardNumber}</p> || <p></p>}
                                <label>Card number: </label>
                                <input id='cardNumber' type='text' value={cardNumber} onChange={e => {
                                    setCardNumber(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.cardNumber) delete newErrors.cardNumber;
                                        setErrors(newErrors)
                                    }
                                    } />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Expiration date: </label>
                                <input id='expDate' type='text' value={expDate} onChange={e => {
                                    setExpDate(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.expDate) delete newErrors.expDate;
                                        setErrors(newErrors)
                                    }
                                    } />
                            </div>
                            <div>
                                <label>CVV: </label>
                                <input id='cvv' type='text' value={cvv} onChange={e => {
                                    setCvv(e.target.value)
                                    const newErrors = {...errors}
                                        if(newErrors.cvv) delete newErrors.cvv;
                                        setErrors(newErrors)
                                    }
                                    } />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
            <div id='cartTotal'>
                <div>
                    <div>
                        <div>
                            <p>Subtotal: {cart && cart.total}</p>
                            <p>Shipping: ${shipping}</p>
                            <p>Est. Taxes: {salesTax !== "" && salesTax >= 0 && `$${salesTax.toFixed(2)}` || 'TBD'}</p>
                        </div>
                        <div style={{ fontWeight: 'bold' }}>Total: ${total && total.toFixed(2) || cart && (cart.total + shipping).toFixed(2)}</div>
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